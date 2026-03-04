import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Map from "./Map";
import AddObject from "./AddObject";
import EditObject from "./EditObject";
import HouseDetail from "./HouseDetail";
import "./MapPage.css";

function MapPage() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("role") === "ROLE_ADMIN";
  const [center, setCenter] = useState({ lat: 36.983251, lng: 127.2211483 });
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [editHouse, setEditHouse] = useState(null);

  const [showDetail, setShowDetail] = useState(false);
  const [detailHouse, setDetailHouse] = useState(null);

  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [filterPrice, setFilterPrice] = useState("전체");
  const [filterType, setFilterType] = useState("전체");
  const [filterRooms, setFilterRooms] = useState("전체");
  const [filterTradeType, setFilterTradeType] = useState("전체");

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [rentRange, setRentRange] = useState([0, 500]);

  const userId = localStorage.getItem("userId");

  // 매물 불러오기
  const fetchHouses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8080/api/houses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHouses(res.data);
      setFilteredHouses(res.data);
    } catch (error) {
      console.error("매물 불러오기 실패:", error);
    }
  };

  useEffect(() => { fetchHouses(); }, []);

  // ===============================
  // ❤️ 좋아요 토글
  // ===============================
  const handleLike = async (houseId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:8080/api/houses/${houseId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHouses((prev) =>
        prev.map((house) =>
          house.id === houseId
            ? {
              ...house,
              likedByMe: !house.likedByMe,
              likeCount: house.likedByMe
                ? house.likeCount - 1
                : house.likeCount + 1,
            }
            : house
        )
      );

    } catch (err) {
      console.error("좋아요 실패", err);
      alert("로그인이 필요합니다.");
    }
  };

  // 필터 적용
  useEffect(() => {
    let filtered = [...houses];
    if (filterType !== "전체")
      filtered = filtered.filter((h) => h.type === filterType);
    if (filterRooms !== "전체") {
      if (filterRooms === "3+") {
        filtered = filtered.filter((h) => h.rooms >= 4);
      } else {
        filtered = filtered.filter((h) => h.rooms === Number(filterRooms));
      }
    }
    // ✅ 거래유형 필터 추가
    if (filterTradeType !== "전체") {
      filtered = filtered.filter(
        (h) => h.listing && h.listing.tradeType === filterTradeType
      );
    }
    // 💰 가격 필터
    if (filterTradeType === "MONTHLY") {
      filtered = filtered.filter(
        (h) =>
          h.listing &&
          h.listing.deposit <= priceRange[1] &&
          h.listing.rent <= rentRange[1]
      );
    }

    if (filterTradeType === "JEONSE") {
      filtered = filtered.filter(
        (h) =>
          h.listing &&
          h.listing.deposit <= priceRange[1]
      );
    }

    if (filterTradeType === "SALE") {
      filtered = filtered.filter(
        (h) =>
          h.listing &&
          h.listing.salePrice <= priceRange[1]
      );
    }
    setFilteredHouses(filtered);
  }, [houses, filterType, filterRooms, filterTradeType, priceRange, rentRange]);

  // 매물 선택
  const moveToAddress = async (house) => {
    if (!window.kakao) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(house.address, async (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {

        // ✅ 지도 이동
        setCenter({
          lat: Number(result[0].y),
          lng: Number(result[0].x)
        });

        try {
          // ✅ 조회수 증가
          await axios.patch(
            `http://localhost:8080/api/houses/${house.id}/view`
          );
        } catch (e) {
          console.error("조회수 증가 실패");
        }

        // ✅ 상세 패널 열기
        setDetailHouse(house);
        setShowDetail(true);

        // 다른 패널 닫기
        setShowAdd(false);
        setShowEdit(false);

      } else {
        alert("주소를 찾을 수 없습니다.");
      }
    });
  };

  // 이미지 클릭 → 확대 모달
  const handleImageClick = (img) => setSelectedImage(img);
  const closeImageModal = () => setSelectedImage(null);

  // 삭제
  const handleDelete = async (houseId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/houses/${houseId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchHouses();
      setSelectedHouse(null);
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
  };

  const token = localStorage.getItem("token");

  return (
    <div className="map-page">
      {/* 지도 영역 */}
      <div className="map-area">
        <Map center={center} houses={filteredHouses} />
      </div>

      {/* 🔹 필터 + 매물 목록 영역: 수정 모달 열리면 숨김 */}
      {!showAdd && !showEdit && (
        <div className="filter-area">
          <h4>매물 필터</h4>

          <h6>거래 유형</h6>
          <div className="filter-buttons">
            {[
              { label: "전체", value: "전체" },
              { label: "월세", value: "MONTHLY" },
              { label: "전세", value: "JEONSE" },
              { label: "매매", value: "SALE" },
            ].map((item) => (
              <button
                key={item.value}
                className={`trade-btn ${filterTradeType === item.value ? "active" : ""
                  }`}
                onClick={() => setFilterTradeType(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* <h4>가격 범위</h4> */}

          {/* 월세 */}
          {filterTradeType === "MONTHLY" && (
            <>
              <label>보증금 (만원)</label>
              <input
                type="range"
                min="0"
                max="20000"
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              />
              <div>~ {priceRange[1]} 만원</div>

              <label>월세 (만원)</label>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={rentRange[1]}
                onChange={(e) => setRentRange([0, Number(e.target.value)])}
              />
              <div>~ {rentRange[1]} 만원</div>
            </>
          )}

          {/* 전세 */}
          {filterTradeType === "JEONSE" && (
            <>
              <label>전세금 (만원)</label>
              <input
                type="range"
                min="0"
                max="200000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              />
              <div>~ {priceRange[1]} 만원</div>
            </>
          )}

          {/* 매매 */}
          {filterTradeType === "SALE" && (
            <>
              <label>매매가 (만원)</label>
              <input
                type="range"
                min="0"
                max="500000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              />
              <div>~ {priceRange[1]} 만원</div>
            </>
          )}

          <h6>주거 형태</h6>
          <div className="filter-buttons">
            {["전체", "아파트", "빌라", "주택"].map((item) => (
              <button
                key={item}
                className={`filter-btn ${filterType === item ? "active" : ""}`}
                onClick={() => setFilterType(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <h6>방 개수</h6>
          <div className="filter-buttons">
            {[
              { label: "전체", value: "전체" },
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "3+", value: "3+" },
            ].map((item) => (
              <button
                key={item.label}
                className={`filter-btn ${filterRooms === item.value ? "active" : ""
                  }`}
                onClick={() => setFilterRooms(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <hr />
          <h4>매물 목록</h4>
          <div className="house-list">
            {filteredHouses.map((house) => (
              <div key={house.id} className="house-item">
                <img
                  src={house.imagePath ? `http://localhost:8080/images/${house.imagePath.split(",")[0]}` : "/src/assets/img/house.png"}
                  alt={house.name}
                  className="house-img"
                  onClick={() => moveToAddress(house)}
                />
                <div className="house-info" onClick={() => moveToAddress(house)}>
                  <strong>{house.name}</strong><br />
                  <small>{house.address}</small><br />
                  <span>
                    {house.listing
                      ? house.listing.tradeType === "MONTHLY"
                        ? `월세 ${house.listing.deposit}/${house.listing.rent}`
                        : house.listing.tradeType === "JEONSE"
                          ? `전세 ${house.listing.deposit}`
                          : `매매 ${house.listing.salePrice}`
                      : "가격 정보 없음"}
                  </span>
                  {/* ❤️ 좋아요 영역 */}
                  <div className="like-area">
                    <span
                      className={`heart ${house.likedByMe ? "liked" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();   
                        handleLike(house.id);
                      }}
                    >
                      ♥
                    </span>
                    <span className="like-count">{house.likeCount}</span>
                  </div>
                </div>

                {/* 🔹수정/삭제 버튼 */}
                {(userId && Number(userId) === house.userId) || isAdmin ? (
                  <div className="d-flex gap-2 mt-2 justify-content-end">
                    {/* 수정 버튼: 본인만 */}
                    {Number(userId) === house.userId && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setEditHouse(house);
                          setShowEdit(true);
                          setShowAdd(false); // 등록 모달 닫기
                        }}
                      >
                        수정
                      </button>
                    )}

                    {/* 삭제 버튼: 본인 또는 관리자 */}
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(house.id)}
                    >
                      삭제
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* ➕ 등록 버튼 */}
          <button
            className="fab-btn"
            onClick={() => {
              if (!token) {
                alert("로그인이 필요합니다.");
                return;
              }

              setShowAdd(true);
              setShowEdit(false);
            }}
          >
            +
          </button>
        </div>
      )}

      {/* 상세 */}
      {showDetail && detailHouse && (
        <HouseDetail
          house={detailHouse}
          onClose={() => setShowDetail(false)}
          onBack={() => setShowDetail(false)}
        />
      )}

      {/* AddObject 모달 */}
      {showAdd && (
        <AddObject
          onClose={() => setShowAdd(false)}
          onAdded={() => fetchHouses()}
        />
      )}

      {/* EditObject 모달 */}
      {showEdit && editHouse && (
        <EditObject
          house={editHouse}
          onClose={() => setShowEdit(false)}
          onUpdated={() => fetchHouses()}
        />
      )}

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div
          onClick={closeImageModal}
          style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)", display: "flex",
            justifyContent: "center", alignItems: "center", zIndex: 9999, cursor: "pointer"
          }}
        >
          <img
            src={selectedImage}
            alt="확대 이미지"
            style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "8px" }}
          />
        </div>
      )}
    </div>
  );
}

export default MapPage;
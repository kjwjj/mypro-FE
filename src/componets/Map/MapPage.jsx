import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Map from "./Map";
import AddObject from "./AddObject";
import "./MapPage.css";

function MapPage() {
  const navigate = useNavigate();

  const [center, setCenter] = useState({ lat: 36.983251, lng: 127.2211483 });
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [filterPrice, setFilterPrice] = useState("전체");
  const [filterType, setFilterType] = useState("전체");
  const [filterRooms, setFilterRooms] = useState("전체");

  const userId = localStorage.getItem("userId");

  // 매물 불러오기
  const fetchHouses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/houses");
      setHouses(res.data);
      setFilteredHouses(res.data);
    } catch (error) {
      console.error("매물 불러오기 실패:", error);
    }
  };

  useEffect(() => { fetchHouses(); }, []);

  // 필터 적용
  useEffect(() => {
    let filtered = [...houses];
    if (filterType !== "전체") filtered = filtered.filter((h) => h.type === filterType);
    if (filterRooms !== "전체") filtered = filtered.filter((h) => h.rooms === Number(filterRooms));
    if (filterPrice !== "전체") {
      if (filterPrice === "0~3000") filtered = filtered.filter((h) => h.price <= 3000);
      else if (filterPrice === "3000~5000") filtered = filtered.filter((h) => h.price > 3000 && h.price <= 5000);
      else if (filterPrice === "5000~7000") filtered = filtered.filter((h) => h.price > 5000 && h.price <= 7000);
      else if (filterPrice === "7000+") filtered = filtered.filter((h) => h.price > 7000);
    }
    setFilteredHouses(filtered);
  }, [houses, filterType, filterRooms, filterPrice]);

  // 매물 선택
  const moveToAddress = (house) => {
    if (!window.kakao) return;
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(house.address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setCenter({ lat: Number(result[0].y), lng: Number(result[0].x) });
        setSelectedHouse(house);
      } else alert("주소를 찾을 수 없습니다.");
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

  return (
    <div className="map-page">
      {/* 지도 영역 */}
      <div className="map-area">
        <Map center={center} houses={filteredHouses} />
      </div>

      {/* 필터 + 매물 목록 */}
      <div className="filter-area">
        <h4>매물 필터</h4>

        <label>가격</label>
        <select value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)}>
          <option value="전체">전체</option>
          <option value="0~3000">0~3,000만</option>
          <option value="3000~5000">3,000~5,000만</option>
          <option value="5000~7000">5,000~7,000만</option>
          <option value="7000+">7,000만 이상</option>
        </select>

        <label>주거 형태</label>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="전체">전체</option>
          <option value="아파트">아파트</option>
          <option value="빌라">빌라</option>
          <option value="주택">주택</option>
        </select>

        <label>방 개수</label>
        <select value={filterRooms} onChange={(e) => setFilterRooms(e.target.value)}>
          <option value="전체">전체</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

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
                <strong>{house.name}</strong><br/>
                <small>{house.address}</small><br/>
                <span>가격: {house.price}만</span> | <span>방: {house.rooms}개</span> | <span>{house.type}</span>
              </div>

              {/* 🔹 작성자만 수정/삭제 버튼 */}
              {userId && Number(userId) === house.userId && (
                <div style={{ marginTop: "4px" }}>
                  <button onClick={() => navigate(`/edit-house/${house.id}`)}>수정</button>
                  <button onClick={() => handleDelete(house.id)}>삭제</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 선택된 매물 미리보기 */}
        {selectedHouse && (
          <div className="house-preview">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4>선택된 매물 정보</h4>
              <button onClick={() => setSelectedHouse(null)}>✕</button>
            </div>

            <div style={{ display: "flex", gap: "8px", overflowX: "auto", marginTop: "8px" }}>
              {selectedHouse.imagePath
                ? selectedHouse.imagePath.split(",").filter(Boolean).map((img, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:8080/images/${img}`}
                      alt={`${selectedHouse.name}_${idx}`}
                      style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px", cursor: "pointer" }}
                      onClick={() => handleImageClick(`http://localhost:8080/images/${img}`)}
                    />
                  ))
                : <img src="/src/assets/img/house.png" alt="default" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px" }} />}
            </div>

            <div style={{ marginTop: "12px", lineHeight: 1.5 }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>{selectedHouse.name}</p>
              <p style={{ margin: 0, color: "#555" }}>{selectedHouse.address}</p>
              <p style={{ margin: 0, color: "#333" }}>
                가격: {selectedHouse.price}만 | 방: {selectedHouse.rooms}개 | {selectedHouse.type}
              </p>
            </div>
          </div>
        )}

        {/* ➕ 플로팅 버튼 */}
        <button className="fab-btn" onClick={() => setShowAdd(true)}>+</button>
      </div>

      {/* AddObject 모달 */}
      {showAdd && <AddObject onClose={() => setShowAdd(false)} onAdded={() => fetchHouses()} />}

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
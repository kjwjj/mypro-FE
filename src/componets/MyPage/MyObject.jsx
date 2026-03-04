import { useEffect, useState } from "react";
import axios from "axios";

function MyObject() {
  const [myHouses, setMyHouses] = useState([]);
  const [likedHouses, setLikedHouses] = useState([]);
  const [activeTab, setActiveTab] = useState("my"); // "my" 또는 "liked"
  const token = localStorage.getItem("token");

  // =========================
  // 내 매물 불러오기
  // =========================
  const fetchMyHouses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/houses/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyHouses(res.data);
    } catch (err) {
      console.error("내 매물 불러오기 실패:", err);
    }
  };

  // =========================
  // 찜한 매물 불러오기
  // =========================
  const fetchLikedHouses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/houses/liked", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLikedHouses(res.data);
    } catch (err) {
      console.error("찜한 매물 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMyHouses();
      fetchLikedHouses();
    }
  }, [token]);

  // =========================
  // 렌더링할 매물 선택
  // =========================
  const housesToShow = activeTab === "my" ? myHouses : likedHouses;

  return (
    <div style={{ padding: "20px" }}>
      {/* 탭 버튼 */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <button
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: activeTab === "my" ? "2px solid #007bff" : "1px solid #ddd",
            background: activeTab === "my" ? "#e7f1ff" : "#fff",
            cursor: "pointer",
          }}
          onClick={() => setActiveTab("my")}
        >
          내 매물
        </button>
        <button
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: activeTab === "liked" ? "2px solid #007bff" : "1px solid #ddd",
            background: activeTab === "liked" ? "#e7f1ff" : "#fff",
            cursor: "pointer",
          }}
          onClick={() => setActiveTab("liked")}
        >
          찜한 매물
        </button>
      </div>

      {/* 제목 */}
      <h4>{activeTab === "my" ? "내 매물" : "찜한 매물"}</h4>

      {/* 매물 목록 */}
      {housesToShow.length === 0 ? (
        <p>{activeTab === "my" ? "등록한 매물이 없습니다." : "찜한 매물이 없습니다."}</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {housesToShow.map((house) => (
            <div
              key={house.id}
              style={{
                border: "1px solid #ddd",
                padding: "16px",
                marginBottom: "12px",
                borderRadius: "8px",
              }}
            >
              <h5>{house.name}</h5>
              <p>{house.address}</p>
              <p>방 {house.rooms}개</p>
              <p>{house.type}</p>

              {house.context && (
                <p style={{ whiteSpace: "pre-line" }}>{house.context}</p>
              )}

              {house.listing && (
                <div>
                  <strong>거래 유형:</strong> {house.listing.tradeType}
                </div>
              )}

              {house.likeCount !== undefined && (
                <div>좋아요: {house.likeCount}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyObject;
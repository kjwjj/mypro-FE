import { useState } from "react";
import Map from "./Map";
import "./MapPage.css";

/* 더미 매물 */
const dummyHouses = [
  {
    id: 1,
    name: "증가로12가길 52",
    address: "서울특별시 서대문구 증가로12가길 52",
    img: "/src/assets/img/house.png", // 예시 이미지
    price: "5,000만",
    rooms: 2,
    type: "아파트",
  },
  {
    id: 2,
    name: "연희로 24",
    address: "서울특별시 서대문구 연희로 24",
    img: "/src/assets/img/model.jpg",
    price: "3,500만",
    rooms: 1,
    type: "빌라",
  },
  {
    id: 3,
    name: "LH 수서",
    address: "서울특별시 강남구 밤고개로 165",
    img: "/src/assets/img/favicon.jpg",
    price: "7,200만",
    rooms: 3,
    type: "주택",
  },
  {
    id: 4,
    name: "증가로12가길 60",
    address: "서울특별시 서대문구 증가로12가길 60",
    img: "/src/assets/img/house.png", // 예시 이미지
    price: "5,000만",
    rooms: 2,
    type: "아파트",
  },
  {
    id: 5,
    name: "증가로12가길 74",
    address: "서울특별시 서대문구 증가로12가길 74",
    img: "/src/assets/img/house.png", // 예시 이미지
    price: "5,000만",
    rooms: 2,
    type: "아파트",
  },
  {
    id: 6,
    name: "증가로12가길 66",
    address: "서울특별시 서대문구 증가로12가길 66",
    img: "/src/assets/img/house.png", // 예시 이미지
    price: "5,000만",
    rooms: 2,
    type: "아파트",
  },
  // 필요 시 더 추가
];

function MapPage() {
  const [center, setCenter] = useState({
    lat: 36.983251,
    lng: 127.2211483,
  });

  /* 주소 → 좌표 → 지도 이동 */
  const moveToAddress = (address) => {
    if (!window.kakao) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setCenter({
          lat: Number(result[0].y),
          lng: Number(result[0].x),
        });
      } else {
        alert("주소를 찾을 수 없습니다.");
      }
    });
  };

  return (
    <div className="map-page">
      {/* 왼쪽 지도 */}
      <div className="map-area">
        <Map center={center} />
      </div>

      {/* 오른쪽 필터 & 매물 리스트 */}
      <div className="filter-area">
        {/* 🔹 필터 */}
        <h4>매물 필터</h4>

        <label>가격</label>
        <select>
          <option>전체</option>
        </select>

        <label>주거 형태</label>
        <select>
          <option>전체</option>
          <option>아파트</option>
          <option>빌라</option>
          <option>주택</option>
        </select>

        <label>방 개수</label>
        <select>
          <option>전체</option>
        </select>

        <hr />

        {/* 🔹 매물 목록 */}
        <h4>매물 목록</h4>
        <div className="house-list">
          {dummyHouses.map((house) => (
            <div
              key={house.id}
              className="house-item"
              onClick={() => moveToAddress(house.address)}
            >
              <img src={house.img} alt={house.name} className="house-img" />
              <div className="house-info">
                <strong>{house.name}</strong>
                <br />
                <small>{house.address}</small>
                <br />
                <span>가격: {house.price}</span> | <span>방: {house.rooms}개</span> | <span>{house.type}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ➕ 플로팅 버튼 */}
        <button className="fab-btn">+</button>
      </div>
    </div>
  );
}

export default MapPage;

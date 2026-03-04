import { useState } from "react";
import axios from "axios";
import "./AddObject.css";

function EditObject({ house, onClose, onUpdated }) {
  const token = localStorage.getItem("token");

  // 🏠 house 기본정보
  const [name, setName] = useState(house.name);
  const [address, setAddress] = useState(house.address);
  const [rooms, setRooms] = useState(house.rooms);
  const [type, setType] = useState(house.type);
  const [context, setContext] = useState(house.context || "");

  // 💰 listing 정보 (house.listing 있다고 가정)
  const [tradeType, setTradeType] = useState(house.listing?.tradeType || "monthly");
  const [deposit, setDeposit] = useState(house.listing?.deposit || "");
  const [rent, setRent] = useState(house.listing?.rent || "");
  const [salePrice, setSalePrice] = useState(house.listing?.salePrice || "");

  // ✅ 주소 검색 함수 추가
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setAddress(data.address);
      },
    }).open();
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("rooms", rooms);
      formData.append("type", type);
      formData.append("context", context);
      // 1️⃣ house 수정
      await axios.put(
        `http://localhost:8080/api/houses/${house.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 2️⃣ listing 수정
      await axios.put(
        `http://localhost:8080/api/listings/${house.listing.id}`,
        {
          tradeType,
          deposit: tradeType !== "sale" ? deposit : null,
          rent: tradeType === "monthly" ? rent : null,
          salePrice: tradeType === "sale" ? salePrice : null
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("수정 실패");
    }
  };

  return (
    <div className="add-object-container">
      <h2 style={{ marginBottom: "24px" }}>매물 수정</h2>

      <Row label="매물명">
        <input
          className="add-object-input"
          value={name} onChange={e => setName(e.target.value)}
        />
      </Row>

      {/* <Row label="주소">
        <input
          className="add-object-input"
          value={address} onChange={e => setAddress(e.target.value)}
        />
      </Row> */}
      {/* ✅ 주소 부분만 수정 */}
      <Row label="주소">
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            className="add-object-input"
            value={address}
            readOnly
          />
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={handleAddressSearch}
          >
            주소 검색
          </button>
        </div>
      </Row>

      <Row label="방 개수">
        <input type="number"
          className="add-object-input"
          value={rooms} onChange={e => setRooms(e.target.value)}
        />
      </Row>

      <Row label="상세 설명">
        <textarea
          className="add-object-textarea"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          rows={4}
        />
      </Row>

      <Row label="주거 형태">
        <select className="add-object-input"
          value={type}
          onChange={e => setType(e.target.value)}>
          <option value="아파트">아파트</option>
          <option value="빌라">빌라</option>
          <option value="주택">주택</option>
        </select>
      </Row>

      <Row label="거래 유형">
        <select
          className="add-object-input"
          value={tradeType}
          onChange={e => setTradeType(e.target.value)}>
          <option value="monthly">월세</option>
          <option value="jeonse">전세</option>
          <option value="sale">매매</option>
        </select>
      </Row>

      {tradeType !== "sale" && (
        <Row label="보증금 (만원)">
          <input
            type="number"
            className="add-object-input"
            value={deposit}
            onChange={e => setDeposit(e.target.value)} />
        </Row>
      )}

      {tradeType === "monthly" && (
        <Row label="월세 (만원)">
          <input
            type="number"
            className="add-object-input"
            value={rent}
            onChange={e => setRent(e.target.value)} />
        </Row>
      )}

      {tradeType === "sale" && (
        <Row label="매매가 (만원)">
          <input
            type="number"
            className="add-object-input"
            value={salePrice}
            onChange={e => setSalePrice(e.target.value)} />
        </Row>
      )}

      <div className="d-flex gap-2 justify-content-end mt-4">
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={onClose}>
          취소
        </button>

        <button
          className="btn btn-primary btn-sm"
          onClick={handleSubmit}>
          저장
        </button>
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="add-object-row">
      <div className="add-object-label">{label}</div>
      {children}
    </div>
  );
}

export default EditObject;
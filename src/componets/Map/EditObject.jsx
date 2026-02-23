import { useState } from "react";
import axios from "axios";
import "./AddObject.css"; // AddObject 스타일 재사용

function EditObject({ house, onClose, onUpdated }) {
  const [name, setName] = useState(house.name);
  const [address, setAddress] = useState(house.address);
  const [price, setPrice] = useState(house.price);
  const [rooms, setRooms] = useState(house.rooms);
  const [type, setType] = useState(house.type);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8080/api/houses/${house.id}`, {
        name, address, price, rooms, type
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("수정 실패");
    }
  };

  return (
    <div className="add-object-container"> {/* AddObject 스타일 재사용 */}
      <h2 style={{ marginBottom: "24px" }}>매물 수정</h2>

      <Row label="매물명">
        <input className="add-object-input" value={name} onChange={e => setName(e.target.value)} />
      </Row>

      <Row label="주소">
        <input className="add-object-input" value={address} onChange={e => setAddress(e.target.value)} />
      </Row>

      <Row label="가격 (만원)">
        <input type="number" className="add-object-input" value={price} onChange={e => setPrice(e.target.value)} />
      </Row>

      <Row label="방 개수">
        <input type="number" className="add-object-input" value={rooms} onChange={e => setRooms(e.target.value)} />
      </Row>

      <Row label="주거 형태">
        <select className="add-object-input" value={type} onChange={e => setType(e.target.value)}>
          <option value="아파트">아파트</option>
          <option value="빌라">빌라</option>
          <option value="주택">주택</option>
        </select>
      </Row>

      <div className="add-object-button-area">
        <button onClick={onClose}>취소</button>
        <button onClick={handleSubmit}>저장</button>
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
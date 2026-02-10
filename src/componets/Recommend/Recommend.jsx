import { useState } from "react";

function Recommend({ houses, onResult }) {
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState("");

  const handleRecommend = () => {
    const result = houses.filter((house) => {
      return (
        (!price || house.price <= price) &&
        (!type || house.type === type) &&
        (!rooms || house.rooms === Number(rooms))
      );
    });

    onResult(result);
  };

  return (
    <div>
      <h4>추천 조건</h4>

      <label>최대 가격</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label>주거 형태</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">전체</option>
        <option value="아파트">아파트</option>
        <option value="빌라">빌라</option>
        <option value="주택">주택</option>
      </select>

      <label>방 개수</label>
      <select value={rooms} onChange={(e) => setRooms(e.target.value)}>
        <option value="">전체</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <button onClick={handleRecommend}>추천받기</button>
    </div>
  );
}

export default Recommend;

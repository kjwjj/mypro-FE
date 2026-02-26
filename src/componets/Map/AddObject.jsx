import { useState } from "react";
import axios from "axios";
import "./AddObject.css";

function AddObject({ onClose, onAdded = () => { } }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState("");

  const [tradeType, setTradeType] = useState("");
  const [deposit, setDeposit] = useState("");
  const [rent, setRent] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [maintenanceFee, setMaintenanceFee] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    // ✅ 로그인 체크 유지
    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    if (!name || !address) {
      alert("매물명과 주소는 필수입니다.");
      return;
    }

    // 🔥 거래 유형별 필수값 체크
    if (tradeType === "MONTHLY" && (!deposit || !rent)) {
      alert("보증금과 월세를 입력하세요.");
      return;
    }

    if (tradeType === "JEONSE" && !deposit) {
      alert("전세금을 입력하세요.");
      return;
    }

    if (tradeType === "SALE" && !salePrice) {
      alert("매매가를 입력하세요.");
      return;
    }

    try {
      // ==========================
      // 1️⃣ house 생성 (multipart)
      // ==========================
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("type", type);
      formData.append("rooms", rooms ? Number(rooms) : 0);

      images.forEach((img) => formData.append("images", img));

      const houseRes = await axios.post(
        "http://localhost:8080/api/houses",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const houseId = houseRes.data.id;

      // ==========================
      // 2️⃣ listing 생성
      // ==========================
      await axios.post(
        "http://localhost:8080/api/listings",
        {
          houseId,
          tradeType,
          deposit: deposit ? Number(deposit) : null,
          rent: rent ? Number(rent) : null,
          salePrice: salePrice ? Number(salePrice) : null,
          maintenanceFee: maintenanceFee ? Number(maintenanceFee) : 0,
          availableFrom: availableFrom || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("매물 등록 완료!");
      onAdded();
      onClose();

    } catch (error) {
      console.error(error);
      alert("매물 등록 실패");
    }
  };

  return (
    <div className="add-object-container">
      <h5>매물 등록</h5>

      <Row label="매물명">
        <input
          className="add-object-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Row>

      <Row label="주소">
        <input
          className="add-object-input"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Row>

      <Row label="주거 형태">
        <select
          className="add-object-input"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">--선택--</option>
          <option value="아파트">아파트</option>
          <option value="빌라">빌라</option>
          <option value="주택">주택</option>
        </select>
      </Row>

      <Row label="방 개수">
        <select
          className="add-object-input"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
        >
          <option value="">--선택--</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </Row>

      <hr />

      <Row label="거래 유형">
        <select
          className="add-object-input"
          value={tradeType}
          onChange={(e) => setTradeType(e.target.value)}
        >
          <option value="">--선택--</option>
          <option value="MONTHLY">월세</option>
          <option value="JEONSE">전세</option>
          <option value="SALE">매매</option>
        </select>
      </Row>

      {tradeType === "MONTHLY" && (
        <>
          <Row label="보증금 (만원)">
            <input
              type="number"
              className="add-object-input"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
            />
          </Row>
          <Row label="월세 (만원)">
            <input
              type="number"
              className="add-object-input"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
            />
          </Row>
        </>
      )}

      {tradeType === "JEONSE" && (
        <Row label="전세금 (만원)">
          <input
            type="number"
            className="add-object-input"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
          />
        </Row>
      )}

      {tradeType === "SALE" && (
        <Row label="매매가 (만원)">
          <input
            type="number"
            className="add-object-input"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />
        </Row>
      )}

      <Row label="관리비 (만원)">
        <input
          type="number"
          className="add-object-input"
          value={maintenanceFee}
          onChange={(e) => setMaintenanceFee(e.target.value)}
        />
      </Row>

      <Row label="입주 가능일">
        <input
          type="date"
          className="add-object-input"
          value={availableFrom}
          onChange={(e) => setAvailableFrom(e.target.value)}
        />
      </Row>

      <Row label="사진">
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      </Row>

      {previews.length > 0 && (
        <div className="add-object-preview-grid">
          {previews.map((src, index) => (
            <div key={index} className="add-object-preview-item">
              <img src={src} alt="미리보기" />
              <button
                className="add-object-remove-btn"
                onClick={() => removeImage(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="d-flex gap-2 justify-content-end mt-4">
        <button className="btn btn-outline-danger btn-sm" onClick={onClose}>
          취소
        </button>

        <button className="btn btn-primary btn-sm" onClick={handleSubmit}>
          등록
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

export default AddObject;
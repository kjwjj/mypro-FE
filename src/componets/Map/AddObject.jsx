import { useState } from "react";
import axios from "axios";

function AddObject({ onClose, onAdded = () => {} }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!name || !address) {
      alert("매물명과 주소는 필수입니다.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("price", price ? Number(price) : 0); // 숫자로 변환
      formData.append("type", type);
      formData.append("rooms", rooms ? Number(rooms) : 0); // 숫자로 변환

      images.forEach((img) => formData.append("images", img));

      await axios.post("http://localhost:8080/api/houses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("매물 등록 완료!");
      onAdded();
      onClose();
    } catch (error) {
      console.error(error);
      alert("매물 등록 실패");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "24px" }}>매물 등록</h2>

      <Row label="매물명">
        <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} />
      </Row>

      <Row label="주소">
        <input style={inputStyle} value={address} onChange={(e) => setAddress(e.target.value)} />
      </Row>

      <Row label="가격 (만원)">
        <input type="number" style={inputStyle} value={price} onChange={(e) => setPrice(e.target.value)} />
      </Row>

      <Row label="주거 형태">
        <select style={inputStyle} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">선택</option>
          <option value="아파트">아파트</option>
          <option value="빌라">빌라</option>
          <option value="주택">주택</option>
        </select>
      </Row>

      <Row label="방 개수">
        <select style={inputStyle} value={rooms} onChange={(e) => setRooms(e.target.value)}>
          <option value="">선택</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </Row>

      <Row label="사진">
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      </Row>

      {previews.length > 0 && (
        <div style={previewGrid}>
          {previews.map((src, index) => (
            <div key={index} style={previewItem}>
              <img src={src} alt="미리보기" style={previewImg} />
              <button style={removeBtn} onClick={() => removeImage(index)}>✕</button>
            </div>
          ))}
        </div>
      )}

      <div style={buttonArea}>
        <button onClick={onClose}>취소</button>
        <button onClick={handleSubmit}>등록</button>
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div style={rowStyle}>
      <div style={labelStyle}>{label}</div>
      {children}
    </div>
  );
}

/* 스타일 */
const containerStyle = { maxWidth: "700px", margin: "40px auto", padding: "24px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" };
const rowStyle = { display: "flex", alignItems: "center", marginBottom: "16px" };
const labelStyle = { width: "120px", fontWeight: "bold" };
const inputStyle = { flex: 1, padding: "8px" };
const previewGrid = { marginLeft: "120px", display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" };
const previewItem = { position: "relative", width: "80px", height: "80px", border: "1px solid #ddd", borderRadius: "4px", overflow: "hidden" };
const previewImg = { width: "100%", height: "100%", objectFit: "cover" };
const removeBtn = { position: "absolute", top: "4px", right: "4px", background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer" };
const buttonArea = { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "30px" };

export default AddObject;
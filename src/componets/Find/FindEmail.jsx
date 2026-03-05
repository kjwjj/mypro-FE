import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FindEmail() {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/[^0-9]/g, "");

    if (numbers.length < 4) return numbers;
    if (numbers.length < 8) {
      return numbers.slice(0, 3) + "-" + numbers.slice(3);
    }

    return (
      numbers.slice(0, 3) +
      "-" +
      numbers.slice(3, 7) +
      "-" +
      numbers.slice(7, 11)
    );
  };

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isFound, setIsFound] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/users/find-email",
        {
          name: name,
          birth: birth,
          phone: phone.replace(/-/g, ""),
        }
      );

      setEmail(res.data.email);
      setMessage(res.data.message);
      setIsFound(true);

    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "아이디 찾기 실패");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>아이디 찾기</h2>
      <p>가입 시 입력한 정보를 입력하세요.</p>

      {!isFound ? (
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>

          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ padding: "8px", width: "250px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <input
              type="date"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              required
              style={{ padding: "8px", width: "250px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="핸드폰 번호"
              value={phone}
              onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
              maxLength={13}
              required
              style={{ padding: "8px", width: "250px" }}
            />
          </div>

          <button type="submit" style={{ padding: "8px 16px" }}>
            아이디 찾기
          </button>
        </form>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <p style={{ fontWeight: "bold" }}>
            가입된 아이디: {email}
          </p>

          <button
            onClick={() => navigate("/login")}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            로그인하러 가기
          </button>
        </div>
      )}

      {message && (
        <p style={{ marginTop: "20px", color: "blue" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default FindEmail;
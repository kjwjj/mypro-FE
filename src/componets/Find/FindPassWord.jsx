import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FindPassWord() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false); // ✅ 전송 여부 상태
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/users/find-password", {
        email: email,
      });

      setMessage("임시 비밀번호를 이메일로 발송했습니다.");
      setIsSent(true); // ✅ 성공하면 버튼 변경
      setEmail("");
    } catch (error) {
      console.error(error);
      setMessage("해당 이메일의 사용자를 찾을 수 없습니다.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>비밀번호 찾기</h2>
      <p>가입 시 사용한 이메일을 입력하세요.</p>

      {!isSent ? (
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "8px", width: "250px", marginRight: "10px" }}
          />
          <button type="submit" style={{ padding: "8px 16px" }}>
            전송
          </button>
        </form>
      ) : (
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
      )}

      {message && (
        <p style={{ marginTop: "20px", color: "blue" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default FindPassWord;

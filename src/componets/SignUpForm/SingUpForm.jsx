import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUpForm.css";
import logo from "../../assets/img/house.png";

function SignUpForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    birth: "",
    gender: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleGenderClick = (gender) => {
    setForm({ ...form, gender });
  };

  // 유효성 검사
  const isValid =
    form.email &&
    form.password &&
    form.passwordConfirm &&
    form.password === form.passwordConfirm &&
    form.name &&
    form.birth &&
    form.gender &&
    form.phone;

  // 회원가입 API 호출
  const handleSignUp = async () => {
  if (!isValid) return;

  try {
    const response = await fetch("http://localhost:8080/api/users/signup/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        name: form.name,
        birth: form.birth,
        gender: form.gender,
        phone: form.phone,
      }),
    });

    console.log("HTTP 상태:", response.status);

    const data = await response.json();
    console.log("응답 데이터:", data);

    if (!response.ok) {
      alert("회원가입 실패: " + (data.message || "알 수 없는 오류"));
      return;
    }

    alert("회원가입 성공!");
    navigate("/login");
  } catch (error) {
    console.error("회원가입 오류:", error);
    alert("회원가입 중 오류가 발생했습니다.");
  }
};

  return (
    <div className="signup-background">
      <div className="signup-card">
        {/* 로고 */}
        <div className="logo-wrap">
          <Link to="/">
            <img src={logo} alt="MyPro Logo" />
          </Link>
        </div>

        {/* 아이디/비밀번호 섹션 */}
        <div className="input-section">
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label>아이디(이메일)</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <label>비밀번호</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="passwordConfirm"
              value={form.passwordConfirm}
              onChange={handleChange}
              required
            />
            <label>비밀번호 재확인</label>
          </div>
        </div>

        {/* 이름/성별/생년월일/휴대폰 섹션 */}
        <div className="input-section">
          <div className="input-group">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <label>이름</label>
          </div>

          {/* 성별 버튼 */}
          <div className="gender-group">
            <label>성별</label>
            <div className="gender-buttons">
              <button
                type="button"
                className={form.gender === "M" ? "active" : ""}
                onClick={() => handleGenderClick("M")}
              >
                남성
              </button>
              <button
                type="button"
                className={form.gender === "F" ? "active" : ""}
                onClick={() => handleGenderClick("F")}
              >
                여성
              </button>
            </div>
          </div>

          <div className="input-group">
            <input
              type="date"
              name="birth"
              value={form.birth}
              onChange={handleChange}
              required
            />
            <label>생년월일</label>
          </div>

          <div className="input-group">
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <label>휴대폰 번호</label>
          </div>
        </div>

        {/* 가입하기 버튼 */}
        <button
          className="signup-btn"
          disabled={!isValid}
          onClick={handleSignUp}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}

export default SignUpForm;

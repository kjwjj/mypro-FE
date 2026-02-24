import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation, Navigate } from "react-router-dom";
import "./SignUpForm.css";
import logo from "../../assets/img/house.png";

function SignUpForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 약관 동의 안 하고 직접 접근하면 차단
  if (!location.state?.agreed) {
    return <Navigate to="/signup" replace />;
  }

  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    birth: "",
    gender: "",
    phone: "",
  });

  const [authCode, setAuthCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3분

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleGenderClick = (gender) => {
    setForm({ ...form, gender });
  };

  // 타이머 효과
  useEffect(() => {
    if (!codeSent || verified) return;

    if (timeLeft <= 0) {
      alert("인증 시간이 만료되었습니다.");
      setCodeSent(false);
      setTimeLeft(180);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [codeSent, timeLeft, verified]);

  const handleSendCode = async () => {
    if (!form.email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {
      await fetch("http://localhost:8080/api/auth/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      setCodeSent(true);
      setTimeLeft(180);
      alert("인증 코드가 발송되었습니다.");
    } catch (e) {
      alert("인증 코드 발송 실패");
    }
  };


  const handleVerify = async () => {
    if (!authCode || authCode.length !== 6) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/email/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          code: authCode,
        }),
      });

      if (!res.ok) {
        alert("인증번호가 올바르지 않습니다.");
        return;
      }

      alert("이메일 인증 완료!");
      setVerified(true);
      setCodeSent(false);
      setAuthCode("");
    } catch (e) {
      alert("인증 확인 실패");
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // 회원가입 유효성 (이메일 인증 완료 포함)
  const isValid =
    form.email &&
    form.password &&
    form.passwordConfirm &&
    form.password === form.passwordConfirm &&
    form.name &&
    form.birth &&
    form.gender &&
    form.phone &&
    verified;

  // const handleSignUp = async () => {
  //   if (!isValid) return;

  //   try {
  //     const response = await fetch(
  //       "http://localhost:8080/api/users/signup/form",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           email: form.email,
  //           password: form.password,
  //           name: form.name,
  //           birth: form.birth,
  //           gender: form.gender,
  //           phone: form.phone,
  //         }),
  //       }
  //     );

  //     const data = await response.json();
  //     if (!response.ok) {
  //       alert("회원가입 실패: " + (data.message || "알 수 없는 오류"));
  //       return;
  //     }

  //     alert("회원가입 성공!");
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("회원가입 오류:", error);
  //     alert("회원가입 중 오류가 발생했습니다.");
  //   }
  // };

  const handleSignUp = async () => {
    // 이메일 인증 안 됐을 때
    if (!verified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    // 비밀번호와 확인이 다를 때
    if (form.password !== form.passwordConfirm) {
      alert("비밀번호와 비밀번호 확인이 다릅니다.");
      return;
    }

    // 다른 필수 입력 체크
    if (!form.email || !form.password || !form.name || !form.birth || !form.gender || !form.phone) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/signup/form",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      let data = {};
      try {
        data = await response.json(); // JSON 파싱
      } catch (e) {
        data.message = "알 수 없는 오류";
      }

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

        {/* 이메일 + 인증 버튼 */}
        <div className="input-section">
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={verified}
            />
            <label>아이디(이메일)</label>
          </div>
          <div className="input-group">
            {!codeSent && !verified && (
              <button
                type="button"
                onClick={handleSendCode}
                className="signup-btn"
              >
                인증하기
              </button>
            )}

            {codeSent && !verified && (
              <input
                type="text"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                placeholder="인증번호 입력"
                maxLength={6}
              />
            )}
          </div>

          {codeSent && !verified && (
            <div className="input-group auth-row">
              <span className="timer-text">
                남은 시간: {formatTime(timeLeft)}
              </span>

              <button
                type="button"
                onClick={handleVerify}
                className="signup-btn small"
              >
                확인
              </button>

              <button
                type="button"
                onClick={handleSendCode}
                className="signup-btn outline small"
              >
                재전송
              </button>
            </div>
          )}
        </div>

        {/* 기존 폼 */}
        <div className="input-section">
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
          onClick={handleSignUp}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}

export default SignUpForm;

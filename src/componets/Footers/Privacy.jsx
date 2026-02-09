import React, { useEffect, useRef } from "react";

function Privacy() {

  const mainRef = useRef(null);
  
  useEffect(() => { // 스크롤제어
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto 20px", // ⬅ 위쪽 여백 늘림
        padding: "40px",
      }}>
      <h1>개인정보처리방침</h1>

      <p>
        본 개인정보처리방침은 MyPro 서비스(이하 “서비스”)가 이용자의 개인정보를 어떻게 수집,
        이용, 보관 및 보호하는지 설명합니다.
      </p>

      <h2>1. 수집하는 개인정보 항목</h2>
      <p>서비스는 다음과 같은 개인정보를 수집할 수 있습니다.</p>
      <ul>
        <li>필수 항목: 이름, 이메일, 비밀번호</li>
        <li>선택 항목: 프로필 이미지, 연락처</li>
        <li>자동 수집 항목: IP 주소, 쿠키, 접속 로그</li>
      </ul>

      <h2>2. 개인정보 수집 및 이용 목적</h2>
      <ul>
        <li>회원 가입 및 로그인 기능 제공</li>
        <li>서비스 제공 및 사용자 맞춤 기능 제공</li>
        <li>고객 문의 응대 및 공지 전달</li>
      </ul>

      <h2>3. 개인정보 보유 및 이용 기간</h2>
      <p>
        이용자의 개인정보는 회원 탈퇴 시 즉시 파기됩니다. 단, 관련 법령에 따라 보관이 필요한 경우
        해당 기간 동안 보관됩니다.
      </p>

      <h2>4. 개인정보 제3자 제공</h2>
      <p>
        서비스는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 법령에 따라
        요구되는 경우 예외로 합니다.
      </p>

      <h2>5. 개인정보 보호를 위한 조치</h2>
      <ul>
        <li>비밀번호 암호화 저장</li>
        <li>접근 권한 최소화</li>
        <li>HTTPS 통신 적용</li>
      </ul>

      <h2>6. 이용자의 권리</h2>
      <p>
        이용자는 언제든지 자신의 개인정보 조회, 수정, 삭제를 요청할 수 있습니다.
      </p>

      <h2>7. 개인정보 보호책임자</h2>
      <p>
        책임자: 정우 고 <br />
        이메일: example@email.com
      </p>

      <h2>8. 개인정보처리방침 변경</h2>
      <p>
        본 방침은 법령 또는 서비스 변경에 따라 수정될 수 있으며, 변경 시 공지합니다.
      </p>

      <p style={{ marginTop: "40px", fontSize: "0.9rem", color: "#666" }}>
        시행일자: 2026년 2월 9일
      </p>
    </div>
  );
}

export default Privacy;

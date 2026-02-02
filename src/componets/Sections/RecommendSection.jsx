import React, { useEffect, useRef } from "react";

// 네 프로젝트 Navbar / Footer
import Navbar from "../../componets/Navbars/Navbar";
import Footer from "../../componets/Footers/Footer";

// 홈에서 보여줄 섹션들 (지금은 최소)
import Login from "../../componets/Login/Login"; // 필요 없으면 지워도 됨

function Home() {
  const mainRef = useRef(null);

  useEffect(() => { // 스크롤제어
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <>
      {/* 상단 네비바 */}
      {/* <Navbar /> */}

      {/* 메인 영역 */}
      <main ref={mainRef}>
        {/* TODO: Hero 섹션 (AI 이사 추천 소개) */}
        {/* TODO: 서비스 특징 */}
        {/* TODO: 견적 비교 / 추천 */}
      </main>

      {/* 하단 푸터 */}
      {/* <Footer /> */}
    </>
  );
}

export default Home;

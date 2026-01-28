import React from "react";
import logo from "../../assets/img/house.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" style={{ height: "70px" }}>
      <div className="container d-flex align-items-center" style={{ height: "100%" }}>
        {/* 로고 */}
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            alt="MyPro Logo"
            style={{ height: "80px", objectFit: "contain" }}
          />
          houseTalk
        </a>

        {/* 모바일 토글 */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarArgon"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarArgon">
          {/* ✅ 왼쪽 메뉴 */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/newslist">뉴스</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/loan">대출</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/boardlist">게시판</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/service">문의하기</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">About</a>
            </li>
          </ul>

          {/* ✅ 오른쪽 메뉴 */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/login">로그인</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/signup">회원가입</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
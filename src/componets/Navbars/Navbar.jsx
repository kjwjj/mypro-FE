import React, { useEffect, useState } from "react";
import logo from "../../assets/img/house.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);

  const location = useLocation();

  // ✅ 페이지 로드 시 localStorage에서 이름 가져오기
  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);
  }, []);

  useEffect(() => {
    const navbar = document.getElementById("navbarArgon");
    if (navbar?.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    setUserName(null);
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
      style={{ height: "70px" }}
    >
      <div className="container d-flex align-items-center" style={{ height: "100%" }}>
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="MyPro Logo" style={{ height: "80px", objectFit: "contain" }} />
          houseTalk
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarArgon"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarArgon">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/newslist">뉴스</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/loan">대출</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/boardlist">게시판</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/service">문의하기</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {userName ? (
              <li className="nav-item dropdown">
                <span
                  className="nav-link d-flex align-items-center dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ cursor: "pointer" }}
                >
                  환영합니다, {userName}님
                </span>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/mypage">
                      마이페이지
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      로그아웃
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">로그인</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">회원가입</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

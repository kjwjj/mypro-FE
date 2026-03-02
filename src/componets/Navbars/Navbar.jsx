import React, { useEffect, useState } from "react";
import logo from "../../assets/img/house.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);

  const location = useLocation();

  // ✅ 페이지 로드 시 localStorage에서 이름 가져오기
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");

    if (token && name) {
      setUserName(name);
    } else {
      setUserName(null);
    }
  }, [location]);

  useEffect(() => {
    const navbar = document.getElementById("navbarArgon");
    if (navbar?.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
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
            {/* 🔹 서비스 드롭다운 */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="serviceDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                서비스
              </a>
              <ul className="dropdown-menu" aria-labelledby="serviceDropdown">
                <li>
                  <Link className="dropdown-item" to="/loan">
                    대출
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/map">
                    매물
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/recommend">
                    주거 추천
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item"><Link className="nav-link" to="/newslist">뉴스</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/boardlist">게시판</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/service">고객지원</Link></li>
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
                    <Link
                      className="dropdown-item"
                      to={
                        localStorage.getItem("role") === "ROLE_ADMIN"
                          ? "/dashboard"
                          : "/mypage"
                      }
                    >
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

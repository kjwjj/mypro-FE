import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="header-global">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow">
        <div className="container">
          {/* 로고 */}
          <Link className="navbar-brand" to="/">
            MyPro
          </Link>

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
            {/* 왼쪽 메뉴 */}
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/news">
                  뉴스
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/loan">
                  대출
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mypage">
                  마이페이지
                </Link>
              </li>
            </ul>

            {/* 오른쪽 메뉴 */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  로그인
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  회원가입
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

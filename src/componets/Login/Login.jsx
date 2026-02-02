import "./Login.css"
import logo from "../../assets/img/house.png"
import LoginForm from "../LoginForm/LoginForm"
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <main className="login-page">
        <section className="section section-shaped">
          {/* Argon 배경 */}
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="container pt-lg-0">
            {/* 로고 전용 row */}
            <div className="row justify-content-center mb-2">
              <div className="col-auto text-center">
                <Link to="/">
                  <img
                    src={logo}
                    alt="MyPro Logo"
                    style={{ maxWidth: "200px" }}
                  />
                </Link>
              </div>
            </div>

            {/* 로그인 카드 */}
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <LoginForm />
              </div>
            </div>
          </div>
        </section>
      </main >
    </>
  );
} export default Login;
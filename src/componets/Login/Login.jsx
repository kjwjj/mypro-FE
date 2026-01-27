import Navbar from "../Navbars/Navbar";
import Footer from "../Footers/Footer";
import "./index.css"
import logo from "../../assets/img/house.png"

function Login() {
  return (
    <>
      <main className="fullscreen-page">
        <div className="fullscreen-content">
          <section className="section section-shaped section-lg">
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
                  <img
                    src={logo}
                    alt="MyPro Logo"
                    style={{ maxWidth: "200px" }}
                  />
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card bg-secondary shadow border-0">
                    {/* 상단 */}
                    <div className="card-header bg-white pb-1 text-center">
                      <small className="text-muted">Sign in with</small>
                      <div className="social-login-bars mt-4">
                        <button className="social-bar google">
                          <i className="fab fa-google me-2" />
                          Google로 로그인
                        </button>
                        <button className="social-bar naver">
                          N 네이버로 로그인
                        </button>
                        <button className="social-bar kakao">
                          K 카카오로 로그인
                        </button>
                      </div>
                    </div>
                    {/* 본문 */}
                    <div className="card-body px-lg-5 pt-2 pb-3">
                      <div className="text-center text-muted social-divider">
                        <small>Or sign in with credentials</small>
                      </div>
                      <form>
                        <div className="form-group mb-3">
                          <div className="input-group input-group-alternative">
                            <span className="input-group-text">
                              <i className="ni ni-email-83" />
                            </span>
                            <input className="form-control" placeholder="Email" type="email" />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group input-group-alternative">
                            <span className="input-group-text">
                              <i className="ni ni-lock-circle-open" />
                            </span> <input className="form-control" placeholder="Password" type="password" />
                          </div>
                        </div>
                        <div className="custom-control custom-checkbox mb-3">
                          <input className="custom-control-input" id="remember" type="checkbox" />
                          <label className="custom-control-label" htmlFor="remember"> Remember me </label>
                        </div>
                        <div className="text-center">
                          <button type="button" className="btn btn-primary my-4 w-100" > Sign in </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* 하단 링크 */}
                  <div className="row mt-3">
                    <div className="col-6">
                      <a href="#" className="text-light">
                        <small>Forgot password?</small>
                      </a>
                    </div>
                    <div className="col-6 text-end">
                      <a href="/signup" className="text-light">
                        <small>Create new account</small>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
} export default Login;
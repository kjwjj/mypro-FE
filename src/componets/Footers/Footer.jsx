import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";

function Footer() {

  const mainRef = useRef(null);

  useEffect(() => { // 스크롤제어
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-5">
        <div className="row">
          {/* 브랜드 */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">HouseTalk</h5>
            <p className="text-muted small">
              AI 기반 이사 · 주거 플랫폼<br />
              더 쉽고, 더 똑똑한 주거 선택
            </p>
          </div>

          {/* 서비스 */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">서비스</h6>
            <ul className="list-unstyled small">
              <li><Link to="/loan" className="text-muted text-decoration-none">대출 </Link></li>
              <li><Link to="/map" className="text-muted text-decoration-none"> 매물 </Link></li>
              <li><a href="#" className="text-muted text-decoration-none">주거 분석</a></li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">고객지원</h6>
            <ul className="list-unstyled small">
              <li>
                <Link to="/service?tab=faq" className="text-muted text-decoration-none">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link to="/service?tab=qna" className="text-muted text-decoration-none">
                  문의하기
                </Link>
              </li>
              <li>
                <Link to="/service?tab=notice" className="text-muted text-decoration-none">
                  공지사항
                </Link>
              </li>
            </ul>
          </div>

          {/* 정책 */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">정책</h6>
            <ul className="list-unstyled small">
              <li>
                <Link to="/terms" className="text-muted text-decoration-none">
                  이용약관
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted text-decoration-none">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary" />

        <div className="row align-items-center">
          {/* 왼쪽: 저작권 */}
          <div className="col-md-6 text-center text-md-start text-muted small">
            © {new Date().getFullYear()} MyPro. All rights reserved.
          </div>

          {/* 오른쪽: 아이콘 */}
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <a
              href="https://github.com/kjwjj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light me-3"
            >
              <i className="bi bi-github fs-4"></i>
            </a>

            <a
              href="https://notion.so/37286ca93f8f4a3aaeff68ddcc8a7b23"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light me-3"
            >
              <i className="bi bi-journal-bookmark fs-4"></i>
            </a>

            <a
              href="mailto:rhwjddn89@naver.com"
              className="text-light"
            >
              <i className="bi bi-envelope fs-4"></i>
            </a>
          </div>
        </div>
      </div>
    </footer >
  );
}

export default Footer;

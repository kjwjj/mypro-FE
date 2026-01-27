function Footer() {
  return (
    <footer className="bg-dark text-white w-100">
      <div className="container-fluid px-0">
        <div className="row align-items-center py-4 mx-0">
          <div className="col-md-6">
            <h5 className="mb-1">MyPro</h5>
            <p className="mb-0 text-muted">
              AI 기반 이사 · 주거 플랫폼
            </p>
          </div>

          <div className="col-md-6 text-md-end">
            <a href="/terms" className="text-white me-3">이용약관</a>
            <a href="/privacy" className="text-white">개인정보처리방침</a>
          </div>
        </div>

        <hr className="border-secondary m-0" />

        <div className="text-center py-3">
          © {new Date().getFullYear()} MyPro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

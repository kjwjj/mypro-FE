import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requireAdmin = false }) { // ← 수정
  const token = localStorage.getItem("token"); // 로그인 상태
  const role = localStorage.getItem("role");   // 서버에서 발급된 role 정보

  // 로그인 체크
  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ message: "로그인이 필요합니다." }}
        replace
      />
    );
  }

  // 관리자 권한 필요 && role이 ADMIN이 아니면 접근 차단
  if (requireAdmin && role !== "ROLE_ADMIN") {
    alert("관리자만 접근 가능합니다.");
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
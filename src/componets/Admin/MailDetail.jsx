import React, { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import axios from "axios";
import "./admin.css";
import AdminSidebar from "./AdminSideBar";

function MailDetail() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [mail, setMail] = useState(null);

  // 로그인 체크
  if (!token) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" replace />;
  }

  if (role !== "ROLE_ADMIN") {
    alert("관리자만 접근 가능합니다.");
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    const fetchMailDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/qna/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMail(res.data);
      } catch (err) {
        console.error(err);
        alert("문의 상세 정보를 가져오는데 실패했습니다.");
      }
    };

    fetchMailDetail();
  }, [id, token]);

  if (!mail) return <div>로딩중...</div>;

  return (
    <div className="admin-container">
      {/* ===== 사이드바 ===== */}
      <AdminSidebar />

      {/* ===== 메인 ===== */}
      <div className="main">
        <h1 className="title">문의 상세</h1>

        <div className="chart-card" style={{ padding: "30px" }}>
          <p><strong>이메일:</strong> {mail.userEmail}</p>
          <p><strong>카테고리:</strong> {mail.category}</p>
          <p><strong>제목:</strong> {mail.title}</p>
          <p><strong>작성일:</strong> {new Date(mail.questionDate).toLocaleString()}</p>
          <p>
            <strong>답변상태:</strong>{" "}
            <span
              style={{
                color:
                  mail.answerStatus === "답변완료"
                    ? "#22c55e"
                    : "#ef4444",
                fontWeight: "bold",
              }}
            >
              {mail.answerStatus}
            </span>
          </p>

          <hr style={{ margin: "20px 0" }} />

          <h3>문의 내용</h3>
          <div
            style={{
              background: "#f8fafc",
              padding: "20px",
              borderRadius: "10px",
              whiteSpace: "pre-wrap",
            }}
          >
            {mail.content}
          </div>

          {mail.answerStatus === "답변완료" && (
            <>
              <hr style={{ margin: "30px 0" }} />

              <h3>답변 내용</h3>
              <div
                style={{
                  background: "#ecfdf5",
                  padding: "20px",
                  borderRadius: "10px",
                  whiteSpace: "pre-wrap",
                  border: "1px solid #22c55e"
                }}
              >
                {mail.answerContent}
              </div>

              {mail.answerDate && (
                <p style={{ marginTop: "10px", fontSize: "14px", color: "#64748b" }}>
                  답변일: {new Date(mail.answerDate).toLocaleString()}
                </p>
              )}
            </>
          )}

          <div style={{ marginTop: "30px" }}>
            {mail.answerStatus !== "답변완료" && (
              <Link
                to={`/dashboard/mailinfo/${mail.id}/answer`}
                style={{
                  backgroundColor: "#22c55e",
                  color: "white",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  marginRight: "10px"
                }}
              >
                답변하기
              </Link>
            )}
            <Link
              to="/dashboard/mailinfo"
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "8px 15px",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              목록으로
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MailDetail;
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./admin.css";
import AdminSidebar from "./AdminSideBar";

function MailInfo() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [mailList, setMailList] = useState([]);

  // 로그인 체크
  if (!token) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" replace />;
  }

  if (role !== "ROLE_ADMIN") {
    alert("관리자만 접근 가능합니다.");
    return <Navigate to="/" replace />;
  }

  // 문의 전체 가져오기
  useEffect(() => {
    const fetchMail = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/qna/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMailList(res.data);
      } catch (err) {
        console.error(err);
        alert("문의 데이터를 가져오는데 실패했습니다.");
      }
    };

    fetchMail();
  }, [token]);

  return (
    <div className="admin-container">
      {/* ===== 사이드바 ===== */}
      <AdminSidebar />
      {/* ===== 메인 ===== */}
      <div className="main">
        <h2 className="title">문의 관리</h2>

        {/* ===== 문의 테이블 카드 ===== */}
        <div className="chart-card" style={{ padding: "20px", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>이메일</th>
                <th>카테고리</th>
                <th>제목</th>
                <th>작성일</th>
                <th>답변상태</th>
              </tr>
            </thead>
            <tbody>
              {mailList.length === 0 ? (
                <tr>
                  <td colSpan="5">문의 내역이 없습니다.</td>
                </tr>
              ) : (
                mailList.map((qna) => (
                  <tr key={qna.id}>
                    <td>{qna.userEmail}</td>
                    <td>{qna.category}</td>
                    <td>
                      <Link
                        to={`/dashboard/mailinfo/${qna.id}`}
                        style={{ textDecoration: "none", color: "#3b82f6", fontWeight: "bold" }}
                      >
                        {qna.title}
                      </Link>
                    </td>
                    <td>{new Date(qna.questionDate).toLocaleDateString()}</td>
                    <td
                      style={{
                        color:
                          qna.answerStatus === "답변완료"
                            ? "#22c55e"
                            : "#ef4444",
                        fontWeight: "bold",
                      }}
                    >
                      {qna.answerStatus}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


export default MailInfo
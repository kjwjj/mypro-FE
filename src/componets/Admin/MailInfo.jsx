import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/img/house.png";
import "./admin.css";

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
      <div className="sidebar">
        <Link to="/" className="logo-container" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 0",
          flexDirection: "column",
          textDecoration: "none", // 링크 밑줄 제거
          color: "inherit", // 글자 색 유지
        }}>
          <img
            src={logo}
            alt="Admin Logo"
            style={{
              width: "200px",
              height: "200px",
              marginBottom: "8px",
            }}
          />
        </Link>

        <ul>
          <li>
            <Link to="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
              대시보드
            </Link>
          </li>
          <li>
            <Link to="/dashboard/userinfo" style={{ textDecoration: "none", color: "inherit" }}>
              회원관리
            </Link>
          </li>
          <li>
            <Link to="/dashboard/objectinfo" style={{ textDecoration: "none", color: "inherit" }}>
              매물관리
            </Link>
          </li>
          <li>
            <Link to="/dashboard/noticeinfo" style={{ textDecoration: "none", color: "inherit" }}>
              공지사항
            </Link>
          </li>
          <li>
            <Link to="/dashboard/mailinfo" style={{ textDecoration: "none", color: "inherit" }}>
              문의관리
            </Link>
          </li>
        </ul>
      </div>
      {/* ===== 메인 ===== */}
      <div className="main">
        <h1 className="title">문의 관리</h1>

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
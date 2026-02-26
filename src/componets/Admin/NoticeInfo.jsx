import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/house.png";
import { Table, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import axios from "axios";
import "./board.css"; // BoardList에 있는 css
import { useNavigate } from "react-router-dom";

function NoticeInfo() {
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 10; // 한 페이지에 5개
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // 필요 시 JWT

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/notices?page=${page}&size=${pageSize}`,
          { headers: { Authorization: token ? `Bearer ${token}` : "" } }
        );
        setNotices(res.data.content);
        setTotalPages(res.data.totalPages); // 서버에서 받아온 totalPages 설정
      } catch (err) {
        console.error("공지사항 불러오기 실패", err);
      }
    };

    fetchNotices();
  }, [page, token]);

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
   {/* ===== 메인 영역 ===== */}
      <div className="main">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="title">공지사항</h2>
          <button
            style={{
              backgroundColor: "#0d6efd",
              color: "white",
              border: "none",
              padding: "5px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard/addnotice")}
          >
            작성
          </button>
        </div>

        {/* ===== 공지사항 카드 테이블 ===== */}
        <div className="chart-card" style={{ padding: "20px", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>번호</th>
                <th>제목</th>
                <th style={{ width: "20%" }}>작성일</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <tr key={notice.id}>
                  <td>{notice.id}</td>
                  <td
                    style={{ cursor: "pointer", color: "#0d6efd" }}
                    onClick={() => navigate(`/dashboard/noticedetail/${notice.id}`)}
                  >
                    {notice.title}
                  </td>
                  <td>{notice.createdAt?.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== 페이지네이션 ===== */}
        <div className="d-flex justify-content-center my-3">
          <ul className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${page === index ? "active" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => setPage(index)}
              >
                <span className="page-link">{index + 1}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NoticeInfo
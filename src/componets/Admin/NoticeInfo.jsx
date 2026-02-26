import React, { useState, useEffect } from "react";
import axios from "axios";
import "./board.css"; // BoardList에 있는 css
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSideBar";

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
     <AdminSidebar />

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
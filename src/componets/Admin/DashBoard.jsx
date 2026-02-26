import React, { useState, useEffect } from "react";
import "./admin.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSideBar";

function Dashboard() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ===== 상태 선언 =====
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedTradeType, setSelectedTradeType] = useState("ALL");
  const [tradeCounts, setTradeCounts] = useState({
    ALL: 0,
    MONTHLY: 0,
    JEONSE: 0,
    SALE: 0,
  });
  const [userData, setUserData] = useState([
    { name: "회원", value: 0 }
  ]);
  const [totalBoards, setTotalBoards] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [propertyData, setPropertyData] = useState([
    { name: "매물", value: 0 }
  ]);
  const [mailData, setMailData] = useState([]); // 서버에서 가져올 문의 데이터
  const [noticeList, setNoticeList] = useState([]);

  

  // 로그인 안됨 → 로그인 페이지로 이동
  if (!token) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" replace />;
  }

  // 로그인은 됐지만 관리자 아님 → 홈으로 이동
  if (role !== "ROLE_ADMIN") {
    alert("관리자만 접근 가능합니다.");
    return <Navigate to="/" replace />;
  }

  // ===== 총 데이터 가져오기 =====
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 총 회원수
        const userRes = await axios.get("http://localhost:8080/api/users/count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userCount = userRes.data;
        setTotalUsers(userCount);
        setUserData([{ name: "회원", value: userCount }]);

        // 총 게시글수
        const boardRes = await axios.get("http://localhost:8080/api/boards/count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const boardCount = boardRes.data;
        setTotalBoards(boardCount);

        // 전체 매물 가져오기
        const houseRes = await axios.get("http://localhost:8080/api/houses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const houses = houseRes.data;

        const counts = {
          ALL: houses.length,
          MONTHLY: houses.filter((h) => h.listing?.tradeType === "MONTHLY").length,
          JEONSE: houses.filter((h) => h.listing?.tradeType === "JEONSE").length,
          SALE: houses.filter((h) => h.listing?.tradeType === "SALE").length,
        };

        setTradeCounts(counts);
        setTotalProperties(counts.ALL);
        setPropertyData([
          { name: "매물", value: counts.ALL }
        ]);

        // 공지사항 데이터 가져오기 (예: 최신 3개)
        const noticeRes = await axios.get("http://localhost:8080/api/notices?page=0&size=3", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNoticeList(noticeRes.data.content); // Page 객체라면 content 안에 데이터 있음

        // 최근 문의 메일 (전체)
        const mailRes = await axios.get("http://localhost:8080/api/qna/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const mails = mailRes.data.map((qna) => ({
          id: qna.userEmail,
          type: qna.category,
          date: new Date(qna.questionDate).toLocaleDateString(),
          status: qna.answerStatus,
        }));
        setMailData(mails);
      } catch (err) {
        console.error(err);
        alert("대시보드 데이터를 가져오는데 실패했습니다.");
      }
    };

    fetchData();
  }, [token]);

  const COLORS = ["#3b82f6", "#e2e8f0"];

  return (
    <div className="admin-container">
      {/* ===== 사이드바 ===== */}
      <AdminSidebar />

      {/* ===== 메인 ===== */}
      <div className="main">
        {/* ===== 상단 카드 3개 ===== */}
        <div className="card-wrapper">
          {/* 회원수 도넛 */}
          <div className="chart-card">
            <h3>총 회원수</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={userData} dataKey="value" innerRadius={60} outerRadius={80}>
                  {userData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="center-text">{totalUsers}명</div>
          </div>

          {/* 매물수 도넛 */}
          <div className="chart-card">
            <h3>총 매물수</h3>
            <div className="donut-wrapper">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={propertyData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={80}
                  >
                    {propertyData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="center-text">{totalProperties}개</div>
            </div>
            <div className="trade-filter-buttons">
              {["ALL", "MONTHLY", "JEONSE", "SALE"].map((type) => (
                <button
                  key={type}
                  className={selectedTradeType === type ? "active-btn" : ""}
                  onClick={() => {
                    setSelectedTradeType(type);
                    setTotalProperties(tradeCounts[type]);
                    setPropertyData([
                      { name: "매물", value: tradeCounts[type] }
                    ]);
                  }}
                >
                  {type === "ALL" && "전체"}
                  {type === "MONTHLY" && "월세"}
                  {type === "JEONSE" && "전세"}
                  {type === "SALE" && "매매"}
                </button>
              ))}
            </div>
          </div>

          {/* 게시글 카드 */}
          <div className="stat-card">
            <h3>총 게시글수</h3>
            <p>{totalBoards}개</p>
          </div>
        </div>

        {/* ===== 중간 카드 2개 ===== */}
        <div className="bottom-wrapper">
          <div className="bottom-card">
            <h3>API 사용량</h3>
            <ul>
              <li>
                <span>이번 달 사용량</span>
                <span>12,450 tokens</span>
              </li>
              <li>
                <span>오늘 사용량</span>
                <span>1,230 tokens</span>
              </li>
              <li>
                <span>예상 비용</span>
                <span>$8.23</span>
              </li>
            </ul>
          </div>

          <div className="bottom-card">
            <h3>공지사항</h3>
            <ul>
              {noticeList.length === 0 ? (
                <li>공지사항이 없습니다.</li>
              ) : (
                noticeList.map((notice) => (
                  <li key={notice.id}>
                    <span>{notice.title}</span>
                    <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* ===== 최근 문의 메일 ===== */}
        <div className="mail-card">
          <h3>최근 문의 메일</h3>
          <table>
            <thead>
              <tr>
                <th>아이디</th>
                <th>유형</th>
                <th>날짜</th>
                <th>답변상태</th>
              </tr>
            </thead>
            <tbody>
              {mailData.length === 0 ? (
                <tr>
                  <td colSpan="4">문의 메일이 없습니다.</td>
                </tr>
              ) : (
                mailData.map((mail, index) => (
                  <tr key={index}>
                    <td>{mail.id}</td>
                    <td>{mail.type}</td>
                    <td>{mail.date}</td>
                    <td
                      className={
                        mail.status === "답변완료" ? "status-done" : "status-wait"
                      }
                    >
                      {mail.status}
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

export default Dashboard;
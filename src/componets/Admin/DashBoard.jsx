import React, { useState, useEffect } from "react";
import "./admin.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import logo from "../../assets/img/house.png"
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ===== 상태 선언 =====
  const [totalUsers, setTotalUsers] = useState(0);
  const [userData, setUserData] = useState([
    { name: "회원", value: 0 },
    { name: "기타", value: 0 },
  ]);
  const [totalBoards, setTotalBoards] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [propertyData, setPropertyData] = useState([
    { name: "매물", value: 0 },
    { name: "기타", value: 0 },
  ]);
  const [mailData, setMailData] = useState([]); // 서버에서 가져올 문의 데이터
  // 상단 useState 선언 부분에 추가
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
        setUserData([{ name: "회원", value: userCount }, { name: "기타", value: 0 }]);

        // 총 게시글수
        const boardRes = await axios.get("http://localhost:8080/api/boards/count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const boardCount = boardRes.data;
        setTotalBoards(boardCount);

        // 총 매물수 ✅ URL 수정
        const propertyRes = await axios.get("http://localhost:8080/api/houses/count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const propertyCount = propertyRes.data;
        setTotalProperties(propertyCount);
        setPropertyData([{ name: "매물", value: propertyCount }, { name: "기타", value: 0 }]);

        // 공지사항 데이터 가져오기 (예: 최신 5개)
        const noticeRes = await axios.get("http://localhost:8080/api/notices?page=0&size=5", {
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
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={propertyData} dataKey="value" innerRadius={60} outerRadius={80}>
                  {propertyData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="center-text">{totalProperties}개</div>
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
                <tr><td colSpan="4">문의 메일이 없습니다.</td></tr>
              ) : (
                mailData.map((mail, index) => (
                  <tr key={index}>
                    <td>{mail.id}</td>
                    <td>{mail.type}</td>
                    <td>{mail.date}</td>
                    <td className={mail.status === "답변완료" ? "status-done" : "status-wait"}>
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
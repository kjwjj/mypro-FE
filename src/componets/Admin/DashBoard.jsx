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
  const [userData, setUserData] = useState([{ name: "회원", value: 0 }]);
  const [totalBoards, setTotalBoards] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [propertyData, setPropertyData] = useState([]);
  const [houses, setHouses] = useState([]); // 전체 매물
  const [mailData, setMailData] = useState([]);
  const [noticeList, setNoticeList] = useState([]);

  // 🔵 OpenAI 사용량
  const [openaiUsage, setOpenaiUsage] = useState({
    requests: 0,
    inputTokens: 0,
    outputTokens: 0,
  });


  // 로그인 체크
  if (!token) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" replace />;
  }

  if (role !== "ROLE_ADMIN") {
    alert("관리자만 접근 가능합니다.");
    return <Navigate to="/" replace />;
  }

  // ===== 데이터 가져오기 =====
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
        setTotalBoards(boardRes.data);

        // 전체 매물 가져오기
        const houseRes = await axios.get("http://localhost:8080/api/houses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const housesData = houseRes.data;
        setHouses(housesData);

        // 거래 유형별 개수 계산
        const counts = {
          ALL: housesData.length,
          MONTHLY: housesData.filter((h) => h.listing?.tradeType === "MONTHLY").length,
          JEONSE: housesData.filter((h) => h.listing?.tradeType === "JEONSE").length,
          SALE: housesData.filter((h) => h.listing?.tradeType === "SALE").length,
        };
        setTradeCounts(counts);

        // 초기 PieChart: 전체
        updatePropertyData(housesData, "ALL");

        // 공지사항 (최신 3개)
        const noticeRes = await axios.get("http://localhost:8080/api/notices?page=0&size=3", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNoticeList(noticeRes.data.content);

        // 최근 문의 메일
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


        // // 🔵 OpenAI 사용량 가져오기
        // const usageRes = await axios.get(
        //   "http://localhost:8080/api/openai/usage",
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );

        // const usageData = usageRes.data.data?.[0];

        // setOpenaiUsage({
        //   requests: usageData?.num_requests || 0,
        //   inputTokens: usageData?.input_tokens || 0,
        //   outputTokens: usageData?.output_tokens || 0,
        // });
      } catch (err) {
        console.error(err);
        alert("대시보드 데이터를 가져오는데 실패했습니다.");
      }
    };

    fetchData();
  }, [token]);

  // ===== PieChart 업데이트 함수 =====
  const updatePropertyData = (housesArray, tradeType) => {
    let filtered = housesArray;
    if (tradeType !== "ALL") {
      const key =
        tradeType === "MONTHLY"
          ? "월세"
          : tradeType === "JEONSE"
            ? "전세"
            : "매매";
      filtered = housesArray.filter((h) => h.listing?.tradeType === tradeType);
    }

    // 타입별 개수 (아파트, 빌라, 주택)
    const typeCounts = {};
    filtered.forEach((h) => {
      const type = h.type || "기타";
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    const data = Object.entries(typeCounts).map(([name, value]) => ({ name, value }));
    setPropertyData(data);
    setTotalProperties(filtered.length);
  };

  const COLORS = ["#3b82f6", "#f97316", "#22c55e", "#eab308", "#8b5cf6", "#ec4899"];

  return (
    <div className="admin-container">
      <AdminSidebar />
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
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
                <Pie
                  data={propertyData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={80}
                  nameKey="name"
                // label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {propertyData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}개`, name]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="center-text">{totalProperties}개</div>
            <div className="trade-filter-buttons">
              {["ALL", "MONTHLY", "JEONSE", "SALE"].map((type) => (
                <button
                  key={type}
                  className={selectedTradeType === type ? "active-btn" : ""}
                  onClick={() => {
                    setSelectedTradeType(type);
                    updatePropertyData(houses, type);
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
          {/* 🔵 OpenAI API 사용량 */}
          {/* <div className="bottom-card">
            <h3>OpenAI API 사용량</h3>
            <ul>
              <li>
                <span>요청 수</span>
                <span>{openaiUsage.requests}</span>
              </li>
              <li>
                <span>입력 토큰</span>
                <span>{openaiUsage.inputTokens}</span>
              </li>
              <li>
                <span>출력 토큰</span>
                <span>{openaiUsage.outputTokens}</span>
              </li>
            </ul>
          </div> */}

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
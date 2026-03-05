import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSideBar";
import "./admin.css";

const ITEMS_PER_PAGE = 5; // 한 페이지당 5개

function ObjectInfo() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [houses, setHouses] = useState({ 월세: [], 전세: [], 매매: [] });
  const [pages, setPages] = useState({ 월세: 0, 전세: 0, 매매: 0 });
  const [currentPage, setCurrentPage] = useState({ 월세: 1, 전세: 1, 매매: 1 });

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
    const fetchHouses = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/houses/by-trade-type", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHouses(res.data);

        // 페이지 수 계산
        setPages({
          월세: Math.ceil(res.data["월세"].length / ITEMS_PER_PAGE),
          전세: Math.ceil(res.data["전세"].length / ITEMS_PER_PAGE),
          매매: Math.ceil(res.data["매매"].length / ITEMS_PER_PAGE),
        });
      } catch (err) {
        console.error(err);
        alert("매물 데이터를 가져오는데 실패했습니다.");
      }
    };
    fetchHouses();
  }, [token]);

  const handlePageChange = (type, delta) => {
    setCurrentPage(prev => {
      const newPage = prev[type] + delta;
      if (newPage < 1 || newPage > pages[type]) return prev;
      return { ...prev, [type]: newPage };
    });
  };

  const renderTable = (list, type) => {
    // 현재 페이지에 해당하는 데이터만 slice
    const startIdx = (currentPage[type] - 1) * ITEMS_PER_PAGE;
    const pageList = list.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    return (
      <div className="chart-card" style={{ padding: "20px", overflowX: "auto", marginBottom: "30px" }}>
        <h3>{type}</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>이름</th>
              <th>주소</th>
              <th>방 개수</th>
              <th>타입</th>
              {type === "월세" && (
                <>
                  <th>보증금</th>
                  <th>월세</th>
                </>
              )}
              {type === "전세" && <th>전세금</th>}
              {type === "매매" && <th>매매가</th>}
            </tr>
          </thead>
          <tbody>
            {pageList.length === 0 ? (
              <tr>
                <td colSpan="6">매물이 없습니다.</td>
              </tr>
            ) : (
              pageList.map((house) => (
                <tr key={house.id}>
                  <td>{house.name}</td>
                  <td>{house.address}</td>
                  <td>{house.rooms}</td>
                  <td>{house.type}</td>
                  {type === "월세" && (
                    <>
                      <td>{house.deposit}</td>
                      <td>{house.rent}</td>
                    </>
                  )}
                  {type === "전세" && <td>{house.deposit}</td>}
                  {type === "매매" && <td>{house.salePrice}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* 페이지네이션 버튼 */}
        <div style={{ marginTop: "10px", textAlign: "right" }}>
          <button
            onClick={() => handlePageChange(type, -1)}
            disabled={currentPage[type] === 1}
          >
            이전
          </button>
          <span style={{ margin: "0 10px" }}>
            {currentPage[type]} / {pages[type] || 1}
          </span>
          <button
            onClick={() => handlePageChange(type, 1)}
            disabled={currentPage[type] === pages[type] || pages[type] === 0}
          >
            다음
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="main">
        <h2 className="title">매물 관리</h2>
        {renderTable(houses["월세"], "월세")}
        {renderTable(houses["전세"], "전세")}
        {renderTable(houses["매매"], "매매")}
      </div>
    </div>
  );
}

export default ObjectInfo;
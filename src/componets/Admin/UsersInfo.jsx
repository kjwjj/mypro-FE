import React, { useState, useEffect } from "react";
import "./admin.css";
import logo from "../../assets/img/house.png"
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

function UsersInfo() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [users, setUsers] = useState([]);

  // 로그인 확인
  if (!token) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" replace />;
  }

  if (role !== "ROLE_ADMIN") {
    alert("관리자만 접근 가능합니다.");
    return <Navigate to="/" replace />;
  }

  // 모든 사용자 가져오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        alert("사용자 데이터를 가져오는데 실패했습니다.");
      }
    };

    fetchUsers();
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
          textDecoration: "none",
          color: "inherit",
        }}>
          <img
            src={logo}
            alt="Admin Logo"
            style={{ width: "200px", height: "200px", marginBottom: "8px" }}
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
        <h1 className="title">회원 관리</h1>

        {/* ===== 사용자 정보 카드 ===== */}
        <div className="chart-card" style={{ padding: "20px", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>이름</th><th>아이디</th><th>성별</th>
                <th>생년월일</th><th>전화번호</th><th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td><td>{user.email}</td><td>{user.gender}</td>
                  <td>{user.birth}</td><td>{user.phone}</td>
                  <td>
                    {user.role === "ROLE_USER" && (  // ROLE_USER만 삭제 버튼 표시
                      <button
                        style={{
                          backgroundColor: "#ef4444",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer"
                        }}
                        onClick={async () => {
                          if (window.confirm(`${user.name} 사용자를 정말 삭제하시겠습니까?`)) {
                            try {
                              await axios.delete(`http://localhost:8080/api/users/${user.id}`, {
                                headers: { Authorization: `Bearer ${token}` },
                              });
                              alert("삭제 완료");
                              setUsers(users.filter((u) => u.id !== user.id));
                            } catch (err) {
                              console.error(err);
                              alert("삭제 실패");
                            }
                          }
                        }}
                      >
                        삭제
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersInfo;
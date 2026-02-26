import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/house.png";

function AdminSidebar() {
  return (
    <div className="sidebar">
      <Link
        to="/"
        className="logo-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 0",
          flexDirection: "column",
          textDecoration: "none",
          color: "inherit",
        }}
      >
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
  );
}

export default AdminSidebar;
import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./board.css"; // 사이드바 + 공통 스타일
import logo from "../../assets/img/house.png";

function AddNotice() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // JWT 토큰 필요 시

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/notices",
        { title, content },
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );

      setSuccess("공지사항이 등록되었습니다!");
      setError("");
      
      // 1~2초 후 리스트 페이지로 이동
      setTimeout(() => navigate("/dashboard/noticeinfo"), 1500);
    } catch (err) {
      console.error(err);
      setError("공지사항 등록 실패");
      setSuccess("");
    }
  };

  return (
    <div className="admin-container">
      {/* ===== 사이드바 ===== */}
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

      {/* ===== 메인 영역 ===== */}
      <div className="main">
        <div className="notice-header d-flex justify-content-between align-items-center mb-3">
          <h2>공지사항 작성</h2>
        </div>

        {error && <Alert color="danger">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="title">제목</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="공지 제목을 입력하세요"
            />
          </FormGroup>

          <FormGroup>
            <Label for="content">내용</Label>
            <Input
              id="content"
              type="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="공지 내용을 입력하세요"
              style={{ minHeight: "150px" }}
            />
          </FormGroup>

          <div className="d-flex justify-content-end">
            <Button color="secondary" type="button" onClick={() => navigate(-1)} className="me-2">
              취소
            </Button>
            <Button color="primary" type="submit">
              저장
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddNotice;
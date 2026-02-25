import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/img/house.png";
import "./admin.css";

function AnswerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [mail, setMail] = useState(null);
  const [answer, setAnswer] = useState("");

  const [loadingAi, setLoadingAi] = useState(false);
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
    const fetchMailDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/qna/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMail(res.data);
      } catch (err) {
        console.error(err);
        alert("문의 정보를 가져오는데 실패했습니다.");
      }
    };

    fetchMailDetail();
  }, [id, token]);

  // 🤖 AI 초안 생성
  const handleGenerateAi = async () => {
    try {
      setLoadingAi(true);

      const res = await axios.get(
        `http://localhost:8080/api/qna/${id}/draft`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAnswer(res.data);
    } catch (err) {
      console.error(err);
      alert("AI 초안 생성 실패");
    } finally {
      setLoadingAi(false);
    }
  };

  // 💾 최종 답변 저장
  const handleSubmit = async () => {
    if (!answer.trim()) {
      alert("답변 내용을 입력하세요.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/qna/${id}/answer`,
        { answer },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("답변 등록 완료!");
      navigate(`/dashboard/mailinfo/${id}`);
    } catch (err) {
      console.error(err);
      alert("답변 등록 실패");
    }
  };

  // const handleSubmit = async () => {
  //   if (!answer.trim()) {
  //     alert("답변 내용을 입력하세요.");
  //     return;
  //   }

  //   try {
  //     await axios.put(
  //       `http://localhost:8080/api/qna/${id}/answer`,
  //       { answer },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     alert("답변 등록 완료!");
  //     navigate(`/dashboard/mailinfo/${id}`);
  //   } catch (err) {
  //     console.error(err);
  //     alert("답변 등록 실패");
  //   }
  // };

  if (!mail) return <div>로딩중...</div>;

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
        <h1 className="title">답변 작성</h1>

        <div className="chart-card" style={{ padding: "30px" }}>
          <p><strong>제목:</strong> {mail.title}</p>
          <p><strong>문의 유형:</strong> {mail.category}</p>
          <hr style={{ margin: "20px 0" }} />

          <h3>문의 내용</h3>
          <div
            style={{
              background: "#f8fafc",
              padding: "20px",
              borderRadius: "10px",
              whiteSpace: "pre-wrap",
              marginBottom: "20px"
            }}
          >
            {mail.content}
          </div>

          <h3>답변 작성</h3>
          {/* 🤖 AI 초안 버튼 */}
          <button
            onClick={handleGenerateAi}
            disabled={loadingAi}
            style={{
              backgroundColor: "#6366f1",
              color: "white",
              padding: "8px 15px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              marginBottom: "15px",
            }}
          >
            {loadingAi ? "AI 생성 중..." : "AI 초안 생성"}
          </button>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows="8"
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "20px",
            }}
          />

          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#22c55e",
              color: "white",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            답변 등록
          </button>
          {/* <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows="6"
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "20px"
            }}
          />

          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#22c55e",
              color: "white",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              marginRight: "10px"
            }}
          >
            답변 등록
          </button> */}

          <button
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: "#94a3b8",
              color: "white",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer"
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnswerPage;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button
} from "reactstrap";
import axios from "axios";
import logo from "../../assets/img/house.png"; // 로고 경로 맞게 수정

function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [notice, setNotice] = useState(null);

  const token = localStorage.getItem("token");
  const userId = Number(localStorage.getItem("userId"));
  const role = localStorage.getItem("role");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/notices/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setNotice(res.data))
      .catch(err => console.error(err));
  }, [id, token]);

  if (!notice) return <div>로딩중...</div>;

  const username = localStorage.getItem("userName"); // 로그인한 사용자 이름
  const isAuthor = username === notice.author; // author 필드와 비교
  const isAdmin = role === "ROLE_ADMIN";

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/notices/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { isAdmin } // 위 NoticeController에 맞춘 params 전달
        }
      );
      alert("삭제 완료");
      navigate("/dashboard/noticeinfo");
    } catch (error) {
      console.error(error);
      alert("삭제 실패");
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
      <Container className="pt-5">
        <Row className="justify-content-center">
          <Col lg="8">
            <Card className="shadow">
              <CardBody>
                <h3>{notice.title}</h3>
                <p className="text-muted">
                  작성자: {notice.author}
                </p>
                <hr />
                <p>{notice.content}</p>

                <div className="mt-3 d-flex justify-content-end gap-2">
                  {(isAuthor || isAdmin) && (
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => navigate(`/dashboard/notice/edit/${notice.id}`,  { replace: true })}
                    >
                      수정
                    </Button>
                  )}
                  {(isAuthor || isAdmin) && (
                    <Button
                      color="danger"
                      outline
                      size="sm"
                      onClick={handleDelete}
                    >
                      삭제
                    </Button>
                  )}
                  <Button
                    color="secondary"
                    size="sm"
                    onClick={() => navigate("/dashboard/noticeinfo")}
                  >
                    목록
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NoticeDetail;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,       // <-- 추가
  FormGroup,  // <-- 추가
  Input,   // <-- 추가
  CardBody,
  Button
} from "reactstrap";
import axios from "axios";
import logo from "../../assets/img/house.png"; // 로고 경로 맞게 수정

function NoticeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(""); // 상태 필드도 관리

  const token = localStorage.getItem("token");

  // 기존 공지사항 정보 불러오기
  useEffect(() => {

    axios.get(`http://localhost:8080/api/notices/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch(err => console.error(err));
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8080/api/notices/${id}`,
        { title, content, status },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("수정 완료");
      navigate(`/dashboard/noticedetail/${id}`); // 수정 후 상세페이지로 이동
    } catch (error) {
      console.error(error);
      alert("수정 실패");
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
                <h4>공지사항 수정</h4>
                <Form onSubmit={handleUpdate}>
                  <FormGroup>
                    <Input
                      type="text"
                      value={title}
                      placeholder="제목"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Input
                      type="textarea"
                      rows="6"
                      value={content}
                      placeholder="내용"
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </FormGroup>

                  <Button color="primary" type="submit">
                    수정 완료
                  </Button>
                  <Button
                    color="secondary"
                    className="ms-2"
                    onClick={() => navigate(-1)}
                  >
                    취소
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NoticeEdit
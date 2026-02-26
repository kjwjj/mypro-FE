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
import AdminSidebar from "./AdminSideBar";

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
      <AdminSidebar />

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
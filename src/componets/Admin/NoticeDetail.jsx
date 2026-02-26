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
import AdminSidebar from "./AdminSideBar";

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
     <AdminSidebar />

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
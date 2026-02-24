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

function NoticeDetail_U() {
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


  return (

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
                <Button
                  color="secondary"
                  size="sm"
                  onClick={() => navigate("/service?tab=notice")}
                >
                  목록
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default NoticeDetail_U;
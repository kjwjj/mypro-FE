import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button
} from "reactstrap";
import axios from "axios";

function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  const token = localStorage.getItem("token");
  const userId = Number(localStorage.getItem("userId"));
  const role = localStorage.getItem("role");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/boards/${id}`)
      .then(res => {
        setPost(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  if (!post) return <div>로딩중...</div>;

  const isAuthor = userId === post.authorId;
  const isAdmin = role === "ROLE_ADMIN";

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/boards/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
           data: {userId, isAdmin }
        }
      );

      alert("삭제 완료");
      navigate("/boardlist");
    } catch (error) {
      console.error(error);
      alert("삭제 실패");
    }
  };

  return (
    <Container className="pt-5">
      <Row className="justify-content-center">
        <Col lg="8">
          <Card className="shadow">
            <CardBody>
              <h3>{post.title}</h3>
              <p className="text-muted">
                작성자: {post.author} | 조회수: {post.views}
              </p>
              <hr />
              <p>{post.content}</p>

              <div className="mt-3 d-flex gap-2">

                {isAuthor && (
                  <Button
                    color="warning"
                    onClick={() => navigate(`/board/edit/${post.id}`)}
                  >
                    수정
                  </Button>
                )}

                {(isAuthor || isAdmin) && (
                  <Button color="danger" onClick={handleDelete}>
                    삭제
                  </Button>
                )}

                <Button
                  color="secondary"
                  onClick={() => navigate("/boardlist")}
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

export default BoardDetail;
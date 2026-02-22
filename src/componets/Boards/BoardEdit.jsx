import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button
} from "reactstrap";
import axios from "axios";

function BoardEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/boards/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8080/api/boards/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("수정 완료");
      navigate(`/boardlist/${id}`);
    } catch (error) {
      console.error(error);
      alert("수정 실패");
    }
  };

  return (
    <Container className="pt-5">
      <Row className="justify-content-center">
        <Col lg="8">
          <Card className="shadow">
            <CardBody>
              <h4>게시글 수정</h4>
              <Form onSubmit={handleUpdate}>
                <FormGroup>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="textarea"
                    rows="6"
                    value={content}
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
  );
}

export default BoardEdit;
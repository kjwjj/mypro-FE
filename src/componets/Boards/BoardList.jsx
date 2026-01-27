import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom"; // 추가
import "./board.css";

function BoardList() {
  const navigate = useNavigate();

  const boardData = [
    { id: 3, title: "이사 견적 관련 질문", author: "홍길동", date: "2026-01-26", views: 12 },
    { id: 2, title: "AI 추천 정확도 문의", author: "김철수", date: "2026-01-25", views: 30 },
    { id: 1, title: "서비스 오픈 축하합니다!", author: "관리자", date: "2026-01-24", views: 102 },
  ];

  return (
    <main className="board-page">
      <section className="section section-shaped section-lg">
        <div className="shape shape-style-1 bg-gradient-default">
          <span />
          <span />
          <span />
          <span />
        </div>

        <Container className="pt-lg-7">
          <Row className="justify-content-center">
            <Col lg="10">
              <Card className="shadow board-card">
                <CardHeader className="bg-white d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">공지 / 자유게시판</h4>
                  <Button color="primary" size="sm">
                    글쓰기
                  </Button>
                </CardHeader>

                <CardBody className="p-0">
                  <Table responsive hover className="mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th style={{ width: "10%" }}>번호</th>
                        <th>제목</th>
                        <th style={{ width: "15%" }}>작성자</th>
                        <th style={{ width: "15%" }}>작성일</th>
                        <th style={{ width: "10%" }}>조회</th>
                      </tr>
                    </thead>
                    <tbody>
                      {boardData.map((post) => (
                        <tr key={post.id}>
                          <td>{post.id}</td>
                          <td
                            className="board-title"
                            style={{ cursor: "pointer", color: "#007bff" }}
                            onClick={() => navigate(`/boardlist/${post.id}`)}
                          >
                            {post.title}
                          </td>
                          <td>{post.author}</td>
                          <td>{post.date}</td>
                          <td>{post.views}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default BoardList;

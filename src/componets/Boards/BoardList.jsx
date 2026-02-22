import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./board.css";

function BoardList() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0); // ⚠ Spring은 0부터 시작
  const [totalPages, setTotalPages] = useState(0);

  // ✅ 백엔드에서 데이터 가져오기
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/boards?page=${page}&size=10`)
      .then((res) => {
        setPosts(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error("게시글 불러오기 실패", err);
      });
  }, [page]);

  return (
    <main className="board-page">
      <section className="section section-lg">
        <Container className="pt-5">
          <Row className="justify-content-center">
            <Col lg="10">
              <Card className="shadow board-card">
                <CardHeader className="bg-white d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">공지 / 자유게시판</h4>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => navigate("/addboard")}
                  >
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
                      {posts.map((post) => (
                        <tr key={post.id}>
                          <td>{post.id}</td>
                          <td
                            style={{ cursor: "pointer", color: "#007bff" }}
                            onClick={() => navigate(`/boardlist/${post.id}`)}
                          >
                            {post.title}
                          </td>
                          <td>{post.author}</td>
                          <td>
                            {post.createdAt
                              ? post.createdAt.substring(0, 10)
                              : ""}
                          </td>
                          <td>{post.views}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {/* ✅ 서버 기반 페이지네이션 */}
                  <div className="d-flex justify-content-center my-4">
                    <Pagination>
                      {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem
                          key={index}
                          active={page === index}
                        >
                          <PaginationLink
                            onClick={() => setPage(index)}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </Pagination>
                  </div>

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
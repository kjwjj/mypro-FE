import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";

// 더미 데이터 (BoardList와 동일하게)
const boardData = [
  { id: 3, title: "이사 견적 관련 질문", author: "홍길동", date: "2026-01-26", content: "이사 견적 비교 시 여러 업체 견적을 동시에 확인할 수 있나요?" },
  { id: 2, title: "AI 추천 정확도 문의", author: "김철수", date: "2026-01-25", content: "AI 추천 기능의 정확도를 높일 방법에 대해 문의드립니다." },
  { id: 1, title: "서비스 오픈 축하합니다!", author: "관리자", date: "2026-01-24", content: "서비스 오픈을 축하드립니다! 앞으로 많은 이용 부탁드립니다." },
];

function BoardDetail() {
  const { id } = useParams(); // URL에서 :id 가져오기
  const navigate = useNavigate();

  const post = boardData.find((item) => item.id === parseInt(id));

  if (!post) {
    return (
      <Container className="pt-5">
        <h3>게시글을 찾을 수 없습니다.</h3>
        <Button color="primary" onClick={() => navigate("/board")}>
          목록으로 돌아가기
        </Button>
      </Container>
    );
  }

  return (
    <Container className="pt-5">
      <Row className="justify-content-center">
        <Col lg="8">
          <Card className="shadow">
            <CardBody>
              <h3>{post.title}</h3>
              <p className="text-muted">
                작성자: {post.author} | 작성일: {post.date}
              </p>
              <hr />
              <p>{post.content}</p>
              <Button color="primary" onClick={() => navigate("/boardlist")}>
                목록으로 돌아가기
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BoardDetail;

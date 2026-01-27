import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, Badge, Button } from "reactstrap";
import Navbar from "../Navbars/Navbar";
function NewsList() {
  const newsData = [
    { id: 1, source: "네이버", title: "AI 이사 플랫폼 이용자 급증", summary: "AI 기반 이사 견적 비교 서비스 이용자가 빠르게 증가하고 있습니다.", date: "2026-01-27", link: "#", color: "success" },
    { id: 2, source: "네이버", title: "부동산·주거 플랫폼 경쟁 심화", summary: "주거 플랫폼 시장에서 기술 경쟁이 본격화되고 있습니다.", date: "2026-01-26", link: "#", color: "success" },
    { id: 7, source: "네이버", title: "추가 뉴스 1", summary: "네이버 뉴스 더미입니다.", date: "2026-01-23", link: "#", color: "success" },
    { id: 8, source: "네이버", title: "추가 뉴스 2", summary: "네이버 뉴스 더미입니다.", date: "2026-01-22", link: "#", color: "success" },
    { id: 3, source: "구글", title: "글로벌 부동산 데이터 시장 확대", summary: "AI와 빅데이터를 활용한 부동산 분석 시장이 성장 중입니다.", date: "2026-01-26", link: "#", color: "primary" },
    { id: 4, source: "구글", title: "AI 추천 주거 서비스 주목", summary: "개인 맞춤형 주거 추천 서비스가 글로벌 트렌드로 떠오르고 있습니다.", date: "2026-01-25", link: "#", color: "primary" },
    { id: 5, source: "다음", title: "이사 비용 비교 서비스 인기", summary: "합리적인 이사 비용을 찾는 소비자가 늘고 있습니다.", date: "2026-01-25", link: "#", color: "warning" },
    { id: 6, source: "다음", title: "주거 플랫폼, AI 도입 가속화", summary: "AI 기반 자동 추천 기능이 주거 서비스의 핵심이 되고 있습니다.", date: "2026-01-24", link: "#", color: "warning" },
  ];

  const newsPerPage = 2; // 한 페이지에 보여줄 뉴스 갯수
  const sources = ["네이버", "구글", "다음"];

  // 각 출처별 페이지 상태 관리
  const [page, setPage] = useState({
    네이버: 1,
    구글: 1,
    다음: 1
  });

  const handlePrev = (source) => {
    setPage(prev => ({
      ...prev,
      [source]: Math.max(prev[source] - 1, 1)
    }));
  };

  const handleNext = (source, total) => {
    setPage(prev => ({
      ...prev,
      [source]: Math.min(prev[source] + 1, Math.ceil(total / newsPerPage))
    }));
  };

  return (
    <>
    <section className="section" style={{ paddingTop: "100px" }}>
      <Container>
        {/* 제목 */}
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">뉴스</h2>
            <p className="text-muted mb-0">네이버 · 구글 · 다음 주요 뉴스</p>
          </Col>
        </Row>

        {/* 뉴스 섹션 */}
        <Row>
          {sources.map((source) => {
            const filteredNews = newsData.filter(news => news.source === source);
            const startIndex = (page[source] - 1) * newsPerPage;
            const paginatedNews = filteredNews.slice(startIndex, startIndex + newsPerPage);
            const totalPages = Math.ceil(filteredNews.length / newsPerPage);

            return (
              <Col md="4" key={source}>
                <h4 className="mb-3">{source} 뉴스</h4>

                {paginatedNews.map(news => (
                  <Card
                    key={news.id}
                    className="shadow-sm border-0 mb-3"
                    style={{ height: "250px", 
                      overflow: "hidden", 
                      display: "flex", 
                      flexDirection: "column" }}
                  >
                    <CardBody style={{ flex: "1", overflowY: "auto" }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Badge color={news.color} pill>{news.source} 뉴스</Badge>
                        <small className="text-muted">{news.date}</small>
                      </div>
                      <h5 className="mb-2">{news.title}</h5>
                      <p style={{ color: "black", marginBottom: "0.5rem" }} >{news.summary}</p>
                      <a href={news.link} className="text-primary fw-semibold">기사 보러가기 →</a>
                    </CardBody>
                  </Card>
                ))}

                {/* 페이지네이션 버튼 */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      color="secondary"
                      size="sm"
                      disabled={page[source] === 1}
                      onClick={() => handlePrev(source)}
                    >
                      이전
                    </Button>
                    <small>{page[source]} / {totalPages}</small>
                    <Button
                      color="secondary"
                      size="sm"
                      disabled={page[source] === totalPages}
                      onClick={() => handleNext(source, filteredNews.length)}
                    >
                      다음
                    </Button>
                  </div>
                )}
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
    </>
  );
}

export default NewsList;

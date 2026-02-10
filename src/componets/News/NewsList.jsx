import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Badge, Button } from "reactstrap";

function NewsList() {
  // 구글 / 다음 더미
  const staticNewsData = [
    { id: 3, source: "구글", title: "글로벌 부동산 데이터 시장 확대", summary: "AI와 빅데이터를 활용한 부동산 분석 시장이 성장 중입니다.", date: "2026-01-26", link: "#", color: "primary" },
    { id: 4, source: "구글", title: "AI 추천 주거 서비스 주목", summary: "개인 맞춤형 주거 추천 서비스가 글로벌 트렌드로 떠오르고 있습니다.", date: "2026-01-25", link: "#", color: "primary" },
    { id: 5, source: "다음", title: "이사 비용 비교 서비스 인기", summary: "합리적인 이사 비용을 찾는 소비자가 늘고 있습니다.", date: "2026-01-25", link: "#", color: "warning" },
    { id: 6, source: "다음", title: "주거 플랫폼, AI 도입 가속화", summary: "AI 기반 자동 추천 기능이 주거 서비스의 핵심이 되고 있습니다.", date: "2026-01-24", link: "#", color: "warning" },
  ];

  const [newsData, setNewsData] = useState([]);
  const newsPerPage = 2;
  const sources = ["네이버", "구글", "카카오"];
  const [page, setPage] = useState({ 네이버: 1, 구글: 1, 카카오: 1 });


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short", // Wed
      day: "2-digit",  // 20
      month: "short",  // Dec
      year: "numeric", // 2023
    });
  };

  // 네이버 뉴스 API 호출
  useEffect(() => {
    fetch("http://localhost:8080/api/news")
      .then(res => res.json())
      .then(data => setNewsData([...data, ...staticNewsData]))
      .catch(err => {
        console.error("뉴스 불러오기 실패:", err);
        setNewsData(staticNewsData);
      });
  }, []);

  const handlePrev = (source) => setPage(prev => ({ ...prev, [source]: Math.max(prev[source] - 1, 1) }));
  const handleNext = (source, total) => setPage(prev => ({ ...prev, [source]: Math.min(prev[source] + 1, Math.ceil(total / newsPerPage)) }));

  return (
    <section className="section" style={{ paddingTop: "100px" }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">뉴스</h2>
            <p className="text-muted mb-0">네이버 · 구글 · 카카오 주요 뉴스</p>
          </Col>
        </Row>

        <Row>
          {sources.map((source) => {
            const filteredNews = newsData.filter(news => news.source === source);
            const startIndex = (page[source] - 1) * newsPerPage;
            const paginatedNews = filteredNews.slice(startIndex, startIndex + newsPerPage);
            const totalPages = Math.ceil(filteredNews.length / newsPerPage);

            return (
              <Col md="4" key={source}>
                <h4 className="mb-3">{source} 뉴스</h4>
                {paginatedNews.map((news, idx) => (
                  <Card key={`${news.source}-${news.id}-${idx}`} className="shadow-sm border-0 mb-3" style={{ height: "250px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <CardBody style={{ flex: 1, overflowY: "auto" }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Badge color={news.color} pill>{news.source} 뉴스</Badge>
                        <small className="text-muted">{formatDate(news.date)}</small>
                      </div>
                      <h5 className="mb-2">{news.title}</h5>
                      <p style={{ color: "black", marginBottom: "0.5rem" }}>{news.summary}</p>
                      <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-primary fw-semibold">기사 보러가기 →</a>
                    </CardBody>
                  </Card>
                ))}

                {totalPages > 1 && (
                  <div className="d-flex justify-content-between align-items-center">
                    <Button color="secondary" size="sm" disabled={page[source] === 1} onClick={() => handlePrev(source)}>이전</Button>
                    <small>{page[source]} / {totalPages}</small>
                    <Button color="secondary" size="sm" disabled={page[source] === totalPages} onClick={() => handleNext(source, filteredNews.length)}>다음</Button>
                  </div>
                )}
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}

export default NewsList;


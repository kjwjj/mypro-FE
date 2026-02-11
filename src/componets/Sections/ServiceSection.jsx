import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Badge, Button } from "reactstrap";

function ServiceSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const staticNewsData = [
    { id: 1, source: "구글", title: "글로벌 부동산 데이터 시장 확대", date: "2026-01-26", link: "#" },
    { id: 2, source: "구글", title: "AI 추천 주거 서비스 주목", date: "2026-01-25", link: "#" },
    { id: 3, source: "다음", title: "이사 비용 비교 서비스 인기", date: "2026-01-25", link: "#" },
    { id: 4, source: "다음", title: "주거 플랫폼, AI 도입 가속화", date: "2026-01-24", link: "#" },
  ];

  const noticeData = [
    { id: 1, title: "서비스 점검 안내", date: "2026-01-27", link: "#" },
    { id: 2, title: "이사 프로모션 안내", date: "2026-01-25", link: "#" },
    { id: 3, title: "신규 기능 업데이트", date: "2026-01-24", link: "#" },
    { id: 4, title: "회원 혜택 안내", date: "2026-01-23", link: "#" },
  ];

  const [newsData, setNewsData] = useState([]);
  const [newsPage, setNewsPage] = useState(1);
  const [noticePage, setNoticePage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    fetch("http://localhost:8080/api/news")
      .then(res => res.json())
      .then(data => {
        // 네이버 뉴스 + 기존 더미 합치기
        const combined = [...data, ...staticNewsData];

        // 날짜 내림차순 정렬
        combined.sort((a, b) => new Date(b.date) - new Date(a.date));

        setNewsData(combined);
      })
      .catch(err => {
        console.error("뉴스 불러오기 실패:", err);
        setNewsData(staticNewsData);
      });
  }, []);

  // 페이지네이션
  const newsStart = (newsPage - 1) * itemsPerPage;
  const newsEnd = newsStart + itemsPerPage;
  const paginatedNews = newsData.slice(newsStart, newsEnd);
  const newsTotalPages = Math.min(Math.ceil(newsData.length / itemsPerPage), 10);

  const noticeStart = (noticePage - 1) * itemsPerPage;
  const noticeEnd = noticeStart + itemsPerPage;
  const paginatedNotice = noticeData.slice(noticeStart, noticeEnd);
  const noticeTotalPages = Math.ceil(noticeData.length / itemsPerPage);

  const cardStyle = {
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const contentStyle = { flex: 1, overflow: "hidden" };

  return (
    <section className="section bg-secondary">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-4">확인 편한 부동산 뉴스</h2>
            <p className="lead text-muted">뉴스와 공지사항 확인</p>
          </Col>
        </Row>

        <Row>
          {/* 쳇봇 */}
          <Col md="4">
            <Card className="shadow border-0" style={cardStyle}>
              <CardBody
                className="text-center d-flex flex-column justify-content-center"
                style={{
                  pointerEvents: isLoggedIn && isSubscribed ? "auto" : "none",
                  textAlign: "center",
                  color: "black",
                  backgroundColor: isLoggedIn && isSubscribed ? "white" : "#f8f9fa",
                }}
              >
                <i className="ni ni-delivery-fast text-primary display-4 mb-3" />
                <h5 className="mt-2">쳇봇</h5>
                {isLoggedIn && isSubscribed ? (
                  <p className="text-muted">여러 이사업체 견적을 한 번에 비교</p>
                ) : (
                  <p className="text-muted mb-3">
                    로그인 후 구독 요금 결제 시 이용 가능합니다.
                  </p>
                )}
              </CardBody>
            </Card>
          </Col>

          {/* 뉴스 */}
          <Col md="4">
            <Card className="shadow border-0" style={cardStyle}>
              <CardBody style={contentStyle}>
                <h5 className="text-center mb-3">뉴스</h5>
                {paginatedNews.map((news, idx) => (
                  <div key={`${news.id}-${idx}`} className="mb-2">
                    <Badge color="primary" pill className="me-1">
                      {news.source || "뉴스"}
                    </Badge>
                    <a
                      href={news.link}
                      className="text-black fw-bold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {news.title}
                    </a>
                    <br />
                    <small className="text-muted">{news.date}</small>
                  </div>
                ))}
              </CardBody>

              {/* 뉴스 페이지네이션 */}
              {newsTotalPages > 1 && (
                <div className="d-flex justify-content-between p-2">
                  <Button
                    size="sm"
                    color="secondary"
                    disabled={newsPage === 1}
                    onClick={() => setNewsPage(newsPage - 1)}
                  >
                    이전
                  </Button>
                  <small>
                    {newsPage} / {newsTotalPages}
                  </small>
                  <Button
                    size="sm"
                    color="secondary"
                    disabled={newsPage === newsTotalPages}
                    onClick={() => setNewsPage(newsPage + 1)}
                  >
                    다음
                  </Button>
                </div>
              )}
            </Card>
          </Col>

          {/* 공지사항 */}
          <Col md="4">
            <Card className="shadow border-0" style={cardStyle}>
              <CardBody style={contentStyle}>
                <h5 className="text-center mb-3">공지사항</h5>
                {paginatedNotice.map((notice) => (
                  <div key={notice.id} className="mb-2">
                    <Badge color="warning" pill className="me-1">
                      공지
                    </Badge>
                    <a href={notice.link} className="text-dark fw-bold">
                      {notice.title}
                    </a>
                    <br />
                    <small className="text-muted">{notice.date}</small>
                  </div>
                ))}
              </CardBody>

              {/* 공지사항 페이지네이션 */}
              {noticeTotalPages > 1 && (
                <div className="d-flex justify-content-between p-2">
                  <Button
                    size="sm"
                    color="secondary"
                    disabled={noticePage === 1}
                    onClick={() => setNoticePage(noticePage - 1)}
                  >
                    이전
                  </Button>
                  <small>
                    {noticePage} / {noticeTotalPages}
                  </small>
                  <Button
                    size="sm"
                    color="secondary"
                    disabled={noticePage === noticeTotalPages}
                    onClick={() => setNoticePage(noticePage + 1)}
                  >
                    다음
                  </Button>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ServiceSection;

import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, Badge, Button } from "reactstrap";

function ServiceSection() {
  // 로그인/구독 상태 (예시)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);


  // 뉴스 더미(API로 긁어오기)
  const newsData = [
    { id: 1, title: "AI 이사 플랫폼 이용자 급증", date: "2026-01-27", link: "#" },
    { id: 2, title: "부동산·주거 플랫폼 경쟁 심화", date: "2026-01-26", link: "#" },
    { id: 3, title: "글로벌 부동산 데이터 시장 확대", date: "2026-01-25", link: "#" },
    { id: 4, title: "AI 추천 주거 서비스 주목", date: "2026-01-24", link: "#" },
    { id: 5, title: "주거 비용 분석 서비스 인기", date: "2026-01-23", link: "#" },
  ];

  // 공지사항 더미(API로 긁어오기?)
  const noticeData = [
    { id: 1, title: "서비스 점검 안내", date: "2026-01-27", link: "#" },
    { id: 2, title: "이사 프로모션 안내", date: "2026-01-25", link: "#" },
    { id: 3, title: "신규 기능 업데이트", date: "2026-01-24", link: "#" },
    { id: 4, title: "회원 혜택 안내", date: "2026-01-23", link: "#" },
  ];

  const cardStyle = {
    height: "300px", // 카드 높이 고정
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const contentStyle = {
    flex: 1,
    overflow: "hidden",

  };

  // 페이지 상태
  const [newsPage, setNewsPage] = useState(1);
  const [noticePage, setNoticePage] = useState(1);
  const itemsPerPage = 2; // 한 페이지에 보여줄 항목 수

  // 뉴스 페이징
  const newsStart = (newsPage - 1) * itemsPerPage;
  const newsEnd = newsStart + itemsPerPage;
  const paginatedNews = newsData.slice(newsStart, newsEnd);
  const newsTotalPages = Math.ceil(newsData.length / itemsPerPage);

  // 공지사항 페이징
  const noticeStart = (noticePage - 1) * itemsPerPage;
  const noticeEnd = noticeStart + itemsPerPage;
  const paginatedNotice = noticeData.slice(noticeStart, noticeEnd);
  const noticeTotalPages = Math.ceil(noticeData.length / itemsPerPage);

  return (
    <section className="section bg-secondary">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-4">MyPro 서비스 특징</h2>
            <p className="lead text-muted">
              복잡한 이사, 이제 AI로 간단하게
            </p>
          </Col>
        </Row>

        <Row>
          {/* 쳇봇 기능 */}
          <Col md="4">
            <Card className="shadow border-0" style={cardStyle}>
              <CardBody
                className="text-center d-flex flex-column justify-content-center"
                style={{
                  pointerEvents: isLoggedIn && isSubscribed ? "auto" : "none",
                  textAlign: "center",
                  color: "black", // 텍스트 항상 검은색
                  backgroundColor: isLoggedIn && isSubscribed ? "white" : "#f8f9fa" // 회색 배경으로 블락 느낌
                }}
              >
                <i className="ni ni-delivery-fast text-primary display-4 mb-3" />
                <h5 className="mt-2" style={{ color: "black" }}>쳇봇</h5>
                {isLoggedIn && isSubscribed ? (
                  <p className="text-muted" >
                    여러 이사업체 견적을 한 번에 비교
                  </p>
                ) : (
                  <>
                    <p className="text-muted mb-3">
                      로그인 후 구독 요금 결제 시 이용 가능합니다.
                    </p>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
          {/* 뉴스 */}
          <Col md="4">
            <Card className="shadow border-0" style={cardStyle}>
              <CardBody style={contentStyle}>
                <h5 className="text-center mb-3">뉴스</h5>
                {paginatedNews.map((news) => (
                  <div key={news.id} className="mb-2">
                    <Badge color="primary" pill className="me-1">
                      뉴스
                    </Badge>
                    <a href={news.link} className="text-black fw-bold" target="_blank" rel="noopener noreferrer">
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
                  <Button size="sm" color="secondary" disabled={newsPage === 1} onClick={() => setNewsPage(newsPage - 1)}>
                    이전
                  </Button>
                  <small >{newsPage} / {newsTotalPages}</small>
                  <Button size="sm" color="secondary" disabled={newsPage === newsTotalPages} onClick={() => setNewsPage(newsPage + 1)}>
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
                  <Button size="sm" color="secondary" disabled={noticePage === 1} onClick={() => setNoticePage(noticePage - 1)}>
                    이전
                  </Button>
                  <small>{noticePage} / {noticeTotalPages}</small>
                  <Button size="sm" color="secondary" disabled={noticePage === noticeTotalPages} onClick={() => setNoticePage(noticePage + 1)}>
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

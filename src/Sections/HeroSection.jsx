import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { useNavigate } from "react-router-dom";


function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="section section-shaped section-lg">
      <div className="shape shape-style-1 bg-gradient-dark">
        <span />
        <span />
        <span />
        <span />
      </div>

  
      <Container fluid className="py-lg-7 ">
        <Row className="align-items-center">
          {/* 왼쪽 텍스트 영역 */}
          <Col lg="6">
            <h1 className="text-white display-3">
              AI 기반 이사 · 주거 플랫폼
            </h1>
            <p className="lead text-white mt-3">
              이사 견적 비교부터 주거 추천까지
              <br />
              AI가 한 번에 해결해드립니다.
            </p>

            <div className="mt-4">
              <Button color="primary" size="lg" className="me-3">
                이사 견적 받기
              </Button>
              <Button color="secondary" size="lg">
                서비스 소개
              </Button>
            </div>
          </Col>
          {/* 오른쪽 로그인 박스 */}
          <Col lg="4" className="ml-lg-auto mt-5 mt-lg-0">
            <Card className="shadow border-0">
              <CardBody className="px-lg-4 py-lg-4">
                <div className="text-center mb-3">
                  <h5 className="mb-0">로그인</h5>
                  {/* <small className="text-muted d-block mt-1">Sign in with</small> */}
                </div>

                {/* 일반 로그인 폼 */}
                <Form>
                  <FormGroup className="mb-2">
                    <Input type="email" placeholder="이메일" bsSize="sm" />
                  </FormGroup>

                  <FormGroup className="mb-2">
                    <Input type="password" placeholder="비밀번호" bsSize="sm" />
                  </FormGroup>

                  {/* 로그인 / 회원가입 버튼 한 줄 반반 */}
                  <Row className="mb-3">
                    <Col xs="6" className="pe-1">
                      <Button
                        color="primary"
                        size="sm"
                        block
                        onClick={() => navigate("/login")}
                      >
                        로그인
                      </Button>
                    </Col>
                    <Col xs="6" className="ps-1">
                      <Button
                        color="light"
                        size="sm"
                        block
                        onClick={() => navigate("/signup")}
                      >
                        회원가입
                      </Button>
                    </Col>
                  </Row>

                  {/* 소셜 로그인 버튼 한 줄에 3개 */}
                  <Row>
                    <Col xs="4" className="pe-1">
                      <Button
                        style={{ backgroundColor: "#DB4437", color: "#fff" }}
                        size="sm"
                        block
                        className="d-flex align-items-center justify-content-center"
                      >
                        <i className="fab fa-google me-2" />
                        Google
                      </Button>
                    </Col>
                    <Col xs="4" className="px-1">
                      <Button
                        style={{ backgroundColor: "#03C75A", color: "#fff" }}
                        size="sm"
                        block
                        className="d-flex align-items-center justify-content-center"
                      >
                        N 네이버
                      </Button>
                    </Col>
                    <Col xs="4" className="ps-1">
                      <Button
                        style={{ backgroundColor: "#FEE500", color: "#000" }}
                        size="sm"
                        block
                        className="d-flex align-items-center justify-content-center"
                      >
                        K 카카오
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HeroSection;

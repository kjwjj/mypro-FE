import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import logo from "../../assets/img/house.png";
import "./Agree.css";

function Agree() {
  const navigate = useNavigate();

  const [agree, setAgree] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;

    if (name === "all") {
      setAgree({
        all: checked,
        terms: checked,
        privacy: checked,
        marketing: checked
      });
    } else {
      const next = { ...agree, [name]: checked };
      next.all = next.terms && next.privacy && next.marketing;
      setAgree(next);
    }
  };

  return (
    <main className="fullscreen-page">
      <Container className="agree-container">
        {/* 로고 */}
        <div className="text-center mb-2">
          <Link to="/">
            <img src={logo} alt="MyPro Logo" className="agree-logo" />
          </Link>
        </div>

        <Row className="justify-content-center">
          <Col xs="12" md="8" lg="6">
            <Card className="shadow agree-card">
              <CardBody>
                <h4 className="text-center mb-3">약관 동의</h4>

                {/* 전체 동의 */}
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="all"
                      checked={agree.all}
                      onChange={handleChange}
                    />{" "}
                    전체 약관에 동의합니다
                  </Label>
                </FormGroup>

                <hr className="my-2" />

                {/* 이용약관 */}
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="terms"
                      checked={agree.terms}
                      onChange={handleChange}
                    />{" "}
                    [필수] 이용약관
                  </Label>
                  <div className="agree-box">
                    본 약관은 houseTalk 서비스 이용과 관련하여 회사와 이용자 간의
                    권리, 의무 및 책임사항을 규정합니다.
                    <ul>
                      <li>타인의 정보 도용 금지</li>
                      <li>서비스 운영 방해 금지</li>
                    </ul>
                  </div>
                </FormGroup>

                {/* 개인정보 */}
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="privacy"
                      checked={agree.privacy}
                      onChange={handleChange}
                    />{" "}
                    [필수] 개인정보 수집 및 이용
                  </Label>
                  <div className="agree-box">
                    회원가입을 위해 이메일, 비밀번호를 수집하며
                    서비스 제공 목적 외에는 사용되지 않습니다.
                  </div>
                </FormGroup>

                {/* 마케팅 */}
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="marketing"
                      checked={agree.marketing}
                      onChange={handleChange}
                    />{" "}
                    [선택] 마케팅 정보 수신
                  </Label>
                  <div className="agree-box">
                    이벤트 및 혜택 정보를 이메일로 안내할 수 있습니다.
                  </div>
                </FormGroup>

                <Button
                  color="primary"
                  className="w-100 mt-3"
                  disabled={!agree.terms || !agree.privacy}
                  onClick={() => navigate("/signup/form")}
                >
                  다음
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Agree;

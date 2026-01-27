import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Collapse
} from "reactstrap";

function Agree() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    agreeAll: false,
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });

  // 약관 펼치기 상태
  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openMarketing, setOpenMarketing] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "agreeAll") {
        setForm({
          ...form,
          agreeAll: checked,
          agreeTerms: checked,
          agreePrivacy: checked,
          agreeMarketing: checked
        });
      } else {
        setForm({ ...form, [name]: checked });
        const allChecked =
          (name === "agreeTerms" ? checked : form.agreeTerms) &&
          (name === "agreePrivacy" ? checked : form.agreePrivacy) &&
          (name === "agreeMarketing" ? checked : form.agreeMarketing);
        setForm((prev) => ({ ...prev, agreeAll: allChecked }));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agreeTerms || !form.agreePrivacy) {
      alert("필수 약관에 동의해야 회원가입이 가능합니다.");
      return;
    }
    alert(`회원가입 완료!\n이름: ${form.name}\n이메일: ${form.email}`);
  };

  return (
    <Container className="pt-5">
      <Row className="justify-content-center">
        <Col lg="6">
          <Card className="shadow">
            <CardBody>
              <h3 className="mb-4">회원가입</h3>
              <Form onSubmit={handleSubmit}>
                {/* 이름 */}
                <FormGroup>
                  <Label for="name">이름</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="이름 입력"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                {/* 이메일 */}
                <FormGroup>
                  <Label for="email">이메일</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="이메일 입력"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                {/* 비밀번호 */}
                <FormGroup>
                  <Label for="password">비밀번호</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="비밀번호 입력"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <hr />

                {/* 전체 동의 */}
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="agreeAll"
                      checked={form.agreeAll}
                      onChange={handleChange}
                    />{" "}
                    전체 약관에 동의
                  </Label>
                </FormGroup>

                {/* 개별 약관 */}
                <FormGroup check className="mt-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label check>
                      <Input
                        type="checkbox"
                        name="agreeTerms"
                        checked={form.agreeTerms}
                        onChange={handleChange}
                      />{" "}
                      [필수] 이용약관
                    </Label>
                    <Button
                      color="link"
                      size="sm"
                      onClick={() => setOpenTerms(!openTerms)}
                    >
                      {openTerms ? "-" : "+"}
                    </Button>
                  </div>
                  <Collapse isOpen={openTerms}>
                    <div className="p-2 border mt-1" style={{ fontSize: "0.875rem" }}>
                      여기에 이용약관 내용을 넣으세요. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </div>
                  </Collapse>
                </FormGroup>

                <FormGroup check className="mt-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label check>
                      <Input
                        type="checkbox"
                        name="agreePrivacy"
                        checked={form.agreePrivacy}
                        onChange={handleChange}
                      />{" "}
                      [필수] 개인정보 수집/이용
                    </Label>
                    <Button
                      color="link"
                      size="sm"
                      onClick={() => setOpenPrivacy(!openPrivacy)}
                    >
                      {openPrivacy ? "-" : "+"}
                    </Button>
                  </div>
                  <Collapse isOpen={openPrivacy}>
                    <div className="p-2 border mt-1" style={{ fontSize: "0.875rem" }}>
                      여기에 개인정보 수집/이용 내용을 넣으세요. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit.
                    </div>
                  </Collapse>
                </FormGroup>

                <FormGroup check className="mt-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label check>
                      <Input
                        type="checkbox"
                        name="agreeMarketing"
                        checked={form.agreeMarketing}
                        onChange={handleChange}
                      />{" "}
                      [선택] 마케팅/이벤트 수신
                    </Label>
                    <Button
                      color="link"
                      size="sm"
                      onClick={() => setOpenMarketing(!openMarketing)}
                    >
                      {openMarketing ? "-" : "+"}
                    </Button>
                  </div>
                  <Collapse isOpen={openMarketing}>
                    <div className="p-2 border mt-1" style={{ fontSize: "0.875rem" }}>
                      여기에 마케팅/이벤트 수신 내용을 넣으세요. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit.
                    </div>
                  </Collapse>
                </FormGroup>

                {/* 제출 버튼 */}
                <Button
                  color="primary"
                  className="mt-4 w-100"
                  type="submit"
                  disabled={!form.agreeTerms || !form.agreePrivacy}
                >
                  회원가입
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Agree;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";

function LoginForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async () => {
    try {
      // ✅ 로그인 API URL 수정
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // 응답이 실패면 에러 처리
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData || "로그인 실패");
      }

      const data = await response.json();
      console.log("로그인 성공");

      // ✅ 로그인 성공 시 이름과 토큰(localStorage 저장)
      localStorage.setItem("userName", data.name);
      // ✅ 로그인 성공 시 이름과 토큰(localStorage 저장)
      if (data.userName) localStorage.setItem("userName", data.userName);
      if (data.token) localStorage.setItem("token", data.token);

      navigate("/"); // 로그인 성공 후 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <Card className="shadow border-0">
        <CardBody className="px-4 py-4">
          <div className="text-center mb-3">
            <h5 className="mb-0">로그인</h5>
          </div>

          <Form>
            <FormGroup className="mb-2">
              <Input
                type="email"
                name="email"
                placeholder="이메일"
                value={form.email}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={form.password}
                onChange={handleChange}
              />
            </FormGroup>

            <Button color="primary" block onClick={handleLogin}>
              로그인
            </Button>

            <small className="text-muted d-block text-center mb-2">
              Sign in with
            </small>

            <Row className="mt-3">
              <Col xs="4" className="pe-1">
                <Button
                  style={{ backgroundColor: "#EA4335", color: "#fff" }}
                  block
                  size="sm"
                >
                  Google
                </Button>
              </Col>
              <Col xs="4" className="px-1">
                <Button
                  style={{ backgroundColor: "#03C75A", color: "#fff" }}
                  block
                  size="sm"
                >
                  N 네이버
                </Button>
              </Col>
              <Col xs="4" className="ps-1">
                <Button
                  style={{ backgroundColor: "#FEE500", color: "#000" }}
                  block
                  size="sm"
                >
                  K 카카오
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <div className="text-center mt-3">
        <small className="text-muted">
          <span
            role="button"
            onClick={() => navigate("/find-id")}
            style={{ cursor: "pointer" }}
          >
            아이디 찾기
          </span>
          {" | "}
          <span
            role="button"
            onClick={() => navigate("/forgot-password")}
            style={{ cursor: "pointer" }}
          >
            비밀번호 찾기
          </span>
          {" | "}
          <span
            role="button"
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer" }}
          >
            회원가입
          </span>
        </small>
      </div>
    </>
  );
}

export default LoginForm;


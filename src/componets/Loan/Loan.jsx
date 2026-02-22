import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Button,
} from "reactstrap";
import axios from "axios";

function LoanChatbot() {
  const [loanData, setLoanData] = useState({
    loanAmount: "",
    loanPeriod: "",
    income: "",
  });
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "안녕하세요! 이사 맞춤 대출 추천 챗봇이에요. 😄\n대출 금액, 기간, 소득, 대출 용도를 입력해 주세요.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { loanAmount, loanPeriod, income } = loanData;

    if (!loanAmount || !loanPeriod || !income) return;

    // 사용자 메시지 추가
    addMessage(
      "user",
      `대출 금액: ${loanAmount}만원, 기간: ${loanPeriod}년, 소득: ${income}만원`
    );

    setLoading(true);

    try {
      // FastAPI POST 요청
      const res = await axios.post("http://127.0.0.1:8000/query", {
        question: question || "내게 맞는 대출 추천해줘",
        loanAmount: Number(loanData.loanAmount),
        loanPeriod: Number(loanData.loanPeriod),
        income: Number(loanData.income),
      });

      addMessage("bot", res.data.answer);
    } catch (error) {
      console.error(error);
      addMessage("bot", "서버와 통신 중 오류가 발생했어요. 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="pt-5" style={{ maxWidth: "600px" }}>
      <Card className="shadow">
        <CardBody style={{ height: "600px", overflowY: "auto" }}>
          <div>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.sender === "bot" ? "left" : "right",
                  margin: "0.5rem 0",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    borderRadius: "15px",
                    backgroundColor: msg.sender === "bot" ? "#f1f0f0" : "#007bff",
                    color: msg.sender === "bot" ? "#000" : "#fff",
                    whiteSpace: "pre-line",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </CardBody>

        <form onSubmit={handleSubmit} className="p-3">
          <Row className="mb-2">
            <Col md="4">
              <Input
                type="number"
                name="loanAmount"
                placeholder="대출 금액"
                value={loanData.loanAmount}
                onChange={handleChange}
              />
            </Col>
            <Col md="4">
              <Input
                type="number"
                name="loanPeriod"
                placeholder="대출 기간(년)"
                value={loanData.loanPeriod}
                onChange={handleChange}
              />
            </Col>
            <Col md="4">
              <Input
                type="number"
                name="income"
                placeholder="월 소득"
                value={loanData.income}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col>
              <Input
                type="text"
                placeholder="질문을 입력하세요 (선택)"
                value={question}
                onChange={handleQuestionChange}
              />
            </Col>
          </Row>

          <Button type="submit" color="primary" className="w-100" disabled={loading}>
            {loading ? "조회 중..." : "추천 대출 보기"}
          </Button>
        </form>
      </Card>
    </Container>
  );
}

export default LoanChatbot;
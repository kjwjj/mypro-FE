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

function Recommend() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "안녕하세요! 🏠 AI 매물 추천 챗봇입니다.\n원하는 지역, 조건을 입력해주세요.\n예) 증산역 5분 거리 전세 아파트 추천해줘",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!question) return;

    addMessage("user", question);
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8002/recommend",
        { question },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      addMessage("bot", res.data.answer);
    } catch (error) {
      console.error(error);
      addMessage("bot", "추천을 가져오는 중 오류가 발생했어요 😢");
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  return (
    <Container className="pt-5" style={{ maxWidth: "700px" }}>
      <Card className="shadow">
        <CardBody style={{ height: "600px", overflowY: "auto" }}>
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
                  padding: "0.7rem 1rem",
                  borderRadius: "15px",
                  backgroundColor:
                    msg.sender === "bot" ? "#f1f0f0" : "#007bff",
                  color: msg.sender === "bot" ? "#000" : "#fff",
                  maxWidth: "80%",
                  whiteSpace: "pre-line",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </CardBody>

        <form onSubmit={handleSubmit} className="p-3">
          <Row>
            <Col md="9">
              <Input
                type="text"
                placeholder="예) 홍대입구역 10분 거리 월세 5000 이하 추천"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Col>
            <Col md="3">
              <Button
                type="submit"
                color="primary"
                className="w-100"
                disabled={loading}
              >
                {loading ? "추천 중..." : "추천 받기"}
              </Button>
            </Col>
          </Row>
        </form>
      </Card>
    </Container>
  );
}

export default Recommend;
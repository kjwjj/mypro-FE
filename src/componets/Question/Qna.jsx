import React, { useRef, useEffect, useState } from "react";
import { Card, CardBody, Button, Col, Row } from "reactstrap";
import QnaForm from "./QnaForm";
import { useNavigate } from "react-router-dom";

function Qna() {
  const [showForm, setShowForm] = useState(false); // ✅ 이 줄 필수
  const mainRef = useRef(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => { // 스크롤제어
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <Row ref={mainRef}>
      <Col md={{ size: 6, offset: 3 }}>
        {!showForm ? (
          <Card className="shadow">
            <CardBody className="text-center py-5">
              <h5 className="mb-3">궁금한 점이 해결되지 않으셨나요?</h5>
              <p className="text-muted mb-4">
                1:1 문의를 남겨주시면 빠르게 답변드리겠습니다.
              </p>
              <Button
                color="primary"
                onClick={() => {
                  if (!token) {
                    alert("로그인이 필요합니다.");
                    return;
                  }

                  setShowForm(true);
                }}
              >
                문의하기
              </Button>
            </CardBody>
          </Card>
        ) : (
          <QnaForm />
        )}
      </Col>
    </Row>
  );
}

export default Qna;

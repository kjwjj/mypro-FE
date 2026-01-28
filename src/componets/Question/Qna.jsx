import React from "react";
import { Card, CardBody, Button, Col, Row } from "reactstrap";

function Qna() {
  return (
    <Row>
      <Col md={{ size: 6, offset: 3 }}>
        <Card className="shadow">
          <CardBody className="text-center py-5">
            <h5 className="mb-3">궁금한 점이 해결되지 않으셨나요?</h5>
            <p className="text-muted mb-4">
              1:1 문의를 남겨주시면 빠르게 답변드리겠습니다.
            </p>
            <Button color="primary">문의하기</Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Qna;

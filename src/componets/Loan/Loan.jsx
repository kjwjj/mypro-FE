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
  Table 
} from "reactstrap";

function Loan() {
  const [loanData, setLoanData] = useState({
    loanAmount: "",
    loanPeriod: "",
    income: "",
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 임시 로직: AI 추천 대신 예시 데이터
    const recommendedLoans = [
      { bank: "KB국민은행", rate: "3.5%", maxAmount: "5,000만원" },
      { bank: "신한은행", rate: "3.7%", maxAmount: "4,500만원" },
      { bank: "우리은행", rate: "4.0%", maxAmount: "6,000만원" },
    ];

    setResults(recommendedLoans);
  };

  return (
    <>
      <main className="fullscreen-page">
        <Container className="pt-5">
          <Row className="justify-content-center">
            <Col lg="8">
              <Card className="shadow">
                <CardBody>
                  <h3 className="mb-4 text-center">이사 맞춤 대출 추천</h3>

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <Label for="loanAmount">대출 금액</Label>
                          <Input
                            type="number"
                            name="loanAmount"
                            id="loanAmount"
                            placeholder="예: 3000"
                            value={loanData.loanAmount}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label for="loanPeriod">대출 기간(개월)</Label>
                          <Input
                            type="number"
                            name="loanPeriod"
                            id="loanPeriod"
                            placeholder="예: 12"
                            value={loanData.loanPeriod}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label for="income">월 소득</Label>
                          <Input
                            type="number"
                            name="income"
                            id="income"
                            placeholder="예: 400"
                            value={loanData.income}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Button color="primary" className="mt-3 w-100" type="submit">
                      추천 대출 보기
                    </Button>
                  </Form>

                  {/* 추천 대출 결과 */}
                  {results.length > 0 && (
                    <Table className="mt-4" bordered responsive>
                      <thead>
                        <tr>
                          <th>은행</th>
                          <th>금리</th>
                          <th>최대 대출 가능 금액</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((loan, idx) => (
                          <tr key={idx}>
                            <td>{loan.bank}</td>
                            <td>{loan.rate}</td>
                            <td>{loan.maxAmount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default Loan;

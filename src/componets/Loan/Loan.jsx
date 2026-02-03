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
  Table,
} from "reactstrap";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

function Loan() {
  const [loanData, setLoanData] = useState({
    loanAmount: "",
    loanPeriod: "",
    income: "",
  });

  const [results, setResults] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        "/api/B553701/LoanProductSearchingInfo/LoanProductSearchingInfo/getLoanProductSearchingInfo",
        {
          params: {
            serviceKey:
              "uglCqNs/YVjoJB1AkdbGJkqNeKP4Tm2oLcNwp6LmPG2GQqgWwFrdeUJATo/WUcyUz62HpBlEtZRkzWx2N05KYQ==",
            pageNo: 1,
            numOfRows: 100,
            // resultType: "json",
            USGE: "주거",
            // INST_CTG: "은행",
            // TGT_FLTR: "근로자",
          },
          responseType: "text", // XML은 text로 받기
        }
      );

      console.log(res.data)
      // XML → JS 객체 변환
      const parser = new XMLParser({ ignoreAttributes: false });
      const jsonData = parser.parse(res.data);

      const items =
        jsonData?.response?.body?.items?.item || [];

      const allItems = Array.isArray(items) ? items : [items];

      // 추천 상품 필터링: 사용자가 입력한 금액, 기간 기준
      const recommendedItems = allItems.filter((item) => {
        const maxAmount = Number(item.lnlmt);

        // 🔹 여기서 maxtotlntrm 처리
        let maxTerm = 0;
        if (item.maxtotlntrm) {
          if (Array.isArray(item.maxtotlntrm)) {
            maxTerm = Math.max(...item.maxtotlntrm.map((v) => Number(v.trim())));
          } else if (typeof item.maxtotlntrm === "string") {
            maxTerm = Math.max(...item.maxtotlntrm.split(",").map((v) => Number(v.trim())));
          } else {
            maxTerm = Number(item.maxtotlntrm);
          }
        }

        const userAmount = Number(loanData.loanAmount);
        const userPeriod = Number(loanData.loanPeriod);

        return userAmount <= maxAmount && userPeriod <= maxTerm;
      });

      setResults(allItems);
      setRecommended(recommendedItems);
    } catch (error) {
      console.error("대출 데이터 조회 실패", error);
      setResults([]);
      setRecommended([]);
    }
  };

  return (
    <main className="fullscreen-page" >
      <Container className="pt-5" >
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
                        <Label for="loanPeriod">대출 기간(년)</Label>
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
                  {/* 🔹 입력 전에도 추천 기준 예시 안내 */}
                  <div style={{ fontSize: "0.9rem", color: "gray", marginBottom: "1rem" }}>
                    🔹 추천 기준 예시:
                    - 입력한 <strong>대출 금액(단위: 만원)</strong>과 <strong>대출 기간(개월)</strong>이 상품의 최대 한도를 넘지 않는 상품만 추천됩니다.
                    - 예: 입력 금액 1000 → 1000만원, 기간 5개월 → 최대 대출 가능 금액 ≥ 1000, 최대 기간 ≥ 5인 상품이 추천됨.
                  </div>
                  <Button color="primary" className="mt-3 w-100" type="submit">
                    추천 대출 보기
                  </Button>
                </Form>

                {/* 추천 상품 */}
                {recommended.length > 0 && (
                  <>
                    <h5 className="mt-4">추천 상품</h5>
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                      <Table bordered responsive size="sm" style={{ fontSize: "0.7rem", textAlign: "center" }}>
                        <thead>
                          <tr>
                            <th >은행명</th>
                            <th>상품명</th>
                            <th>금리</th>
                            <th>최대 대출 가능 금액</th>
                            <th>상환 기간</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recommended.map((loan, idx) => (
                            <tr key={idx}>
                              <td>{loan.ofrinstnm || "-"}</td>
                              <td>{loan.finprdnm || "-"}</td>
                              <td>{loan.irt ? `${loan.irt}% ${loan.irtCtg}` : "-"}</td>
                              <td>{loan.lnlmt || "-"}</td>
                              <td style={{ whiteSpace: "pre-line" }}>
                                최대: {loan.maxtotlntrm || "-"}년<br />
                                분할상환 최대: {loan.maxdfrmtrm || "-"}년<br />
                                만기일시상환 최대: {loan.maxrdpttrm || "-"}년
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Loan;
import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddBoard() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8080/api/boards", {
                title,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            alert("게시글 등록 완료");
            navigate("/boardlist");

        } catch (err) {
            alert("등록 실패");
        }
    };

    return (
        <main className="board-page">
            <section className="section section-lg">
                <Container className="pt-lg-7">
                    <Row className="justify-content-center">
                        <Col lg="8">
                            <Card className="shadow">
                                <CardHeader className="bg-white">
                                    <h4 className="mb-0">게시글 작성</h4>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={handleSubmit}>
                                        <FormGroup>
                                            <Label>제목</Label>
                                            <Input
                                                type="text"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                required
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>내용</Label>
                                            <Input
                                                type="textarea"
                                                rows="6"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                required
                                            />
                                        </FormGroup>

                                        <div className="text-right">
                                            <Button
                                                type="button"
                                                color="secondary"
                                                className="mr-2"
                                                onClick={() => navigate("/boardlist")}
                                            >
                                                취소
                                            </Button>

                                            <Button type="submit" color="primary">
                                                등록
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
}

export default AddBoard;
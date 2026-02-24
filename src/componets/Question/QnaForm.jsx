import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

function QnaForm() {
  const [form, setForm] = useState({
    title: "",
    category: "general",
    content: "",
  });

  // 로그인 토큰 가져오기
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/qna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // JWT 토큰
        },
        body: JSON.stringify({
          title: form.title,
          category: form.category,
          content: form.content,
        }),
      });

      if (response.ok) {
        alert("문의가 접수되었습니다.");
        setForm({ title: "", category: "general", content: "" });
      } else {
        const err = await response.json();
        console.error(err);
        alert("문의 전송 실패!");
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ maxWidth: "700px", margin: "0 auto" }}>
      <FormGroup>
        <Label for="title">문의 제목</Label>
        <Input
          id="title"
          name="title"
          placeholder="문의 제목을 입력하세요"
          value={form.title}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label for="category">문의 유형</Label>
        <Input
          type="select"
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="general">일반 문의</option>
          <option value="account">계정 문의</option>
          <option value="payment">결제 문의</option>
          <option value="bug">오류 신고</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="content">문의 내용</Label>
        <Input
          type="textarea"
          id="content"
          name="content"
          rows="6"
          placeholder="문의 내용을 자세히 작성해주세요."
          value={form.content}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <div className="text-end">
        <Button color="primary" type="submit">
          문의 제출
        </Button>
      </div>
    </Form>
  );
}

export default QnaForm;
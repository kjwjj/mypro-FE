import React, { useEffect, useState } from "react";
import { Table, Badge, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";

function MyQuestion() {
  const [noticeList, setNoticeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // 로그인 토큰

  useEffect(() => {
    if (!token) return;

    const fetchMyQuestions = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/qna/mine", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          // 🔹 백엔드 데이터 맞게 변환
          const formatted = data.map((item) => ({
            id: item.id,
            title: item.title,
            date: item.questionDate ? item.questionDate.split("T")[0] : "",
            status: item.answerStatus === "대기중" ? "pending" : "done",
          }));
          setNoticeList(formatted);
        } else {
          console.error("문의 내역 조회 실패");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyQuestions();
  }, [token]);

  if (!token) return <p>로그인이 필요합니다.</p>;

  if (loading)
    return (
      <div className="text-center mt-4">
        <Spinner color="primary" />
      </div>
    );

  return (
    <div className="mt-4">
      <Table responsive hover className="mb-0">
        <thead>
          <tr>
            <th className="py-3">제목</th>
            <th className="py-3 text-right" style={{ width: "140px" }}>
              등록일
            </th>
          </tr>
        </thead>

        <tbody>
          {noticeList.length === 0 && (
            <tr>
              <td colSpan={2} className="text-center text-muted py-3">
                문의 내역이 없습니다.
              </td>
            </tr>
          )}
          {noticeList.map((notice) => (
            <tr
              key={notice.id}
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/mypage/question/${notice.id}`)
              }
            >
              <td className="py-3">
                <span className="mr-2">{notice.title}</span>
                {notice.status === "pending" ? (
                  <Badge color="warning">대기중</Badge>
                ) : (
                  <Badge color="success">완료</Badge>
                )}
              </td>

              <td className="py-3 text-right text-muted">{notice.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default MyQuestion;
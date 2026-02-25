import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MyQuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/qna/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          const result = await res.json();
          setData(result);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetail();
  }, [id, token]);

  if (!data) return <div>로딩중...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
      <div className="card shadow-sm p-4">

        <h3 className="mb-3">{data.title}</h3>

        <div className="text-muted mb-3">
          작성일: {new Date(data.questionDate).toLocaleString()}
        </div>

        <hr />

        <h5>문의 내용</h5>
        <div className="p-3 bg-light rounded mb-4" style={{ whiteSpace: "pre-wrap" }}>
          {data.content}
        </div>

        {data.answerStatus === "답변완료" && (
          <>
            <h5 className="text-success">답변</h5>
            <div
              className="p-3 rounded"
              style={{
                backgroundColor: "#ecfdf5",
                whiteSpace: "pre-wrap",
              }}
            >
              {data.answerContent}
            </div>
          </>
        )}

        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/mypage?tab=myquestion")}
        >
          목록
        </button>

      </div>
    </div>
  );
}

export default MyQuestionDetail;
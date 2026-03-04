import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import axios from "axios";

function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState(""); // 새 댓글
  const [replyInputs, setReplyInputs] = useState({}); // 각 댓글별 답글

  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const isAdmin = role === "ROLE_ADMIN";
  const currentUserId = Number(localStorage.getItem("userId"));

  // ======================
  // 게시글 / 댓글 불러오기
  // ======================
  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/boards/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/boards/${id}/comments`);
       console.log("댓글 전체 데이터:", res.data); // 🔥 여기가 핵심
      setComments(res.data || []); // DTO 배열 그대로 사용
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  if (!post) return <div>로딩중...</div>;

  const isAuthor = userEmail === post.author;

  // ======================
  // 댓글 / 대댓글 등록
  // ======================
  const handleAddComment = async (parentId = null, content = null) => {
    const text = content ?? commentContent;
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:8080/api/boards/${id}/comments`,
        { content: text, parentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 댓글/대댓글 상태 업데이트
      if (parentId === null) {
        setComments(prev => [...prev, res.data]);
        setCommentContent("");
      } else {
        setComments(prev =>
          prev.map(c =>
            c.id === parentId
              ? { ...c, replies: [...(c.replies || []), res.data] }
              : c
          )
        );
        setReplyInputs(prev => ({ ...prev, [parentId]: "" }));
      }
    } catch (err) {
      console.error(err);
      alert("댓글 작성 실패");
    }
  };

  // ======================
  // 댓글 삭제
  // ======================
  const handleDeleteComment = async (commentId, commentUserId) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    if (commentUserId !== currentUserId && !isAdmin) {
      alert("삭제 권한 없음");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/api/boards/${id}/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { email: userEmail, isAdmin }
        }
      );

      // 삭제 후 state 반영 (대댓글 재귀)
      const removeComment = list =>
        list
          .filter(c => c.id !== commentId)
          .map(c => ({ ...c, replies: removeComment(c.replies || []) }));

      setComments(prev => removeComment(prev));
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
  };

  // ======================
  // 댓글 렌더링 (대댓글 포함)
  // ======================
  const renderComments = (commentsList, level = 0) => {
    return commentsList.map(comment => (
      <div
        key={comment.id}
        style={{
          marginLeft: level * 20,
          borderLeft: level ? "1px solid #ddd" : "none",
          paddingLeft: 10,
          marginTop: 10
        }}
      >
        <p>
          <strong>{comment.username}</strong> |{" "}
          {new Date(comment.createdAt).toLocaleString()}
        </p>
        <p>{comment.content}</p>

        <div className="d-flex gap-2 mb-2">
          {/* 답글 버튼 클릭 시 입력창 열기 */}
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() =>
              setReplyInputs(prev => ({
                ...prev,
                [comment.id]: prev[comment.id] || ""
              }))
            }
          >
            답글
          </button>

          {/* 삭제 버튼 */}
          {(comment.userId === currentUserId || isAdmin) && (
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleDeleteComment(comment.id, comment.userId)}
            >
              삭제
            </button>
          )}
        </div>

        {/* 답글 입력창 */}
        {replyInputs.hasOwnProperty(comment.id) && (
          <div className="mb-2">
            <textarea
              className="form-control"
              rows="2"
              placeholder={`@${comment.username} 답글`}
              value={replyInputs[comment.id]}
              onChange={e =>
                setReplyInputs(prev => ({ ...prev, [comment.id]: e.target.value }))
              }
            />
            <button
              className="btn btn-sm btn-primary mt-1"
              onClick={() => handleAddComment(comment.id, replyInputs[comment.id])}
            >
              등록
            </button>
          </div>
        )}

        {/* 대댓글 재귀 */}
        {comment.replies && comment.replies.length > 0 &&
          renderComments(comment.replies, level + 1)}
      </div>
    ));
  };

  // ======================
  // 게시글 삭제
  // ======================
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/boards/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { email: userEmail, isAdmin }
        }
      );
      alert("삭제 완료");
      navigate("/boardlist");
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
  };
  
  return (
    <Container className="pt-5">
      <Row className="justify-content-center">
        <Col lg="8">
          <Card className="shadow">
            <CardBody>
              <h3>{post.title}</h3>
              <p className="text-muted">
                작성자: {post.author} | 조회수: {post.views}
              </p>
              <hr />
              <p>{post.content}</p>

              {/* 댓글 작성 */}
              <div className="mt-4">
                <h5>댓글 작성</h5>
                <textarea
                  className="form-control"
                  rows="3"
                  value={commentContent}
                  onChange={e => setCommentContent(e.target.value)}
                  placeholder="댓글을 입력하세요"
                />
                <button
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => handleAddComment()}
                >
                  등록
                </button>
              </div>

              {/* 댓글 목록 */}
              <div className="mt-3">
                <h5>댓글 목록</h5>
                {renderComments(comments)}
              </div>

              {/* 게시글 수정/삭제 */}
              <div className="mt-3 d-flex justify-content-end gap-2">
                {isAuthor && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/board/edit/${post.id}`)}
                  >
                    수정
                  </button>
                )}

                {(isAuthor || isAdmin) && (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleDelete}
                  >
                    삭제
                  </button>
                )}

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate("/boardlist")}
                >
                  목록
                </button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BoardDetail;
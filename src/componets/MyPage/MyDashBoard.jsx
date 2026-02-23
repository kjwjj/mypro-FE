import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyDashBoard() {
  const [noticeList, setNoticeList] = useState([]);
  const navigate = useNavigate();

   const token = localStorage.getItem("token"); // ✅ 컴포넌트 전체에서 사용 가능

  useEffect(() => {
    if (!token) {
      console.warn("로그인 필요");
      return;
    }

     // 내 게시글 가져오기
    const fetchMyBoards = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/boards/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // API 반환 구조 확인: content 있으면 content, 없으면 res.data
        const data = res.data.content || res.data;
        setNoticeList(data);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      }
    };

    fetchMyBoards();
  }, [token]);

  return (
    <div className="mt-4">
      <Table responsive hover className="mb-0">
        <thead>
          <tr>
            <th className="py-3">제목</th>
            <th className="py-3 text-right" style={{ width: "140px" }}>등록일</th>
          </tr>
        </thead>
        <tbody>
          {noticeList.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center text-muted py-3">
                작성한 게시글이 없습니다.
              </td>
            </tr>
          ) : (
            noticeList.map(notice => (
              <tr key={notice.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/boardlist/${notice.id}`)}>
                <td className="py-3">{notice.title}</td>
                <td className="py-3 text-right text-muted">
                  {notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default MyDashBoard;
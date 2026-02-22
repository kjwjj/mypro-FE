import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyDashBoard() {
  const [noticeList, setNoticeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("/api/boards/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setNoticeList(res.data.content))
      .catch(err => console.error(err));
  }, []);

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
          {noticeList.map(notice => (
            <tr key={notice.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/board/${notice.id}`)}>
              <td className="py-3">{notice.title}</td>
              <td className="py-3 text-right text-muted">{notice.createdAt.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default MyDashBoard;
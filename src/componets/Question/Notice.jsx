import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import axios from "axios";

function Notice() {
  const mainRef = useRef(null);
  const [noticeList, setNoticeList] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // ✅ 추가

  useEffect(() => {
    // 스크롤 초기화
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }

    // 공지사항 가져오기
    const fetchNotices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/notices?page=0&size=5",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNoticeList(res.data.content); // Page 객체라면 content 안에 데이터 있음
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotices();
  }, [token]);

  return (
    <div className="mt-4" ref={mainRef}>
      <Table responsive hover className="mb-0">
        {/* 🔹 헤더 */}
        <thead>
          <tr>
            <th className="py-3">제목</th>
            <th className="py-3 text-right" style={{ width: "140px" }}>
              등록일
            </th>
          </tr>
        </thead>

        {/* 🔹 목록 */}
        <tbody>
          {noticeList.length === 0 ? (
            <tr>
              <td colSpan={2} className="py-3 text-center text-muted">
                공지사항이 없습니다.
              </td>
            </tr>
          ) : (
            noticeList.map((notice) => (
              <tr
                key={notice.id}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  // 나중에 상세 페이지 이동
                   navigate(`/service/notice/${notice.id}`);
                }}
              >
                <td className="py-3">{notice.title}</td>
                <td className="py-3 text-right text-muted">
                  {new Date(notice.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Notice;
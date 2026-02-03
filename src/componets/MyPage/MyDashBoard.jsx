import { Table } from "reactstrap";


function MyDashBoard() {
  const noticeList = [
    {
      id: 1,
      title: "서비스 점검 안내",
      date: "2026-01-20",
    },
    {
      id: 2,
      title: "AI 추천 기능 업데이트",
      date: "2026-01-15",
    },
    {
      id: 3,
      title: "이사 견적 서비스 개선 안내",
      date: "2026-01-10",
    },
  ];
  
  return (
    <div className="mt-4">
      <Table responsive hover className="mb-0">
        {/* 🔹 헤더 */}
        <thead>
          <tr>
            <th className="py-3">제목</th>
            <th
              className="py-3 text-right"
              style={{ width: "140px" }}
            >
              등록일
            </th>
          </tr>
        </thead>

        {/* 🔹 목록 */}
        <tbody>
          {noticeList.map((notice) => (
            <tr
              key={notice.id}
              style={{ cursor: "pointer" }}
              onClick={() => {
                // 나중에 상세 페이지 이동
                // navigate(`/service/notice/${notice.id}`);
              }}
            >
              <td className="py-3">
                {notice.title}
              </td>
              <td className="py-3 text-right text-muted">
                {notice.date}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default MyDashBoard;
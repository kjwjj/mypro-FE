import { Table, Badge } from "reactstrap";

function MyQuestion() {
  const noticeList = [
    { id: 1, title: "문의1", date: "2026-01-20", status: "pending" },
    { id: 2, title: "문의2", date: "2026-01-15", status: "done" },
    { id: 3, title: "문의3", date: "2026-01-10", status: "pending" },
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
            <tr key={notice.id} style={{ cursor: "pointer" }}>
              <td className="py-3">
                <span className="mr-2">{notice.title}</span>
                {notice.status === "pending" ? (
                  <Badge color="warning">대기중</Badge>
                ) : (
                  <Badge color="success">완료</Badge>
                )}
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
export default MyQuestion;
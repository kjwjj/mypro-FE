import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const [user, setUser] = useState({
    email: "",
    name: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ 내 정보 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(res.data);
      } catch {
        alert("사용자 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 전체 수정 (정보 + 비밀번호)
  const handleUpdate = async () => {
    try {
      const { currentPassword, newPassword, confirmPassword } = passwordData;

      // 1️⃣ 개인정보 수정 (이름/전화번호)
      await axios.put(
        "http://localhost:8080/api/users/me",
        {
          name: user.name,
          phone: user.phone,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2️⃣ 비밀번호 변경 체크
      const anyPasswordFilled = currentPassword || newPassword || confirmPassword;

      if (anyPasswordFilled) {
        // 하나라도 입력하면 전체 필수
        if (!currentPassword || !newPassword || !confirmPassword) {
          alert("비밀번호를 모두 입력해주세요.");
          return;
        }

        if (newPassword !== confirmPassword) {
          alert("새 비밀번호가 일치하지 않습니다.");
          return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordRegex.test(newPassword)) {
          alert("비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다.");
          return;
        }

        // 서버 호출 → 비밀번호 변경
        await axios.put(
          "http://localhost:8080/api/users/change-password",
          { currentPassword, newPassword, confirmPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("비밀번호 변경 완료. 다시 로그인해주세요.");
        localStorage.clear();
        navigate("/login");
        return; // 비밀번호 변경 시 바로 로그인 페이지 이동
      }

      // ✅ 비밀번호 수정이 없으면 개인정보만 수정 완료
      alert("회원 정보가 수정되었습니다.");

    } catch (err) {
      const message = err.response?.data?.message || err.message || "수정 실패";
      alert(message);
    }
  };


  // ✅ 탈퇴
  const handleDelete = async () => {
    if (!window.confirm("정말로 탈퇴하시겠습니까?")) return;

    try {
      await axios.delete(
        "http://localhost:8080/api/users/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.clear();
      alert("회원 탈퇴 완료");
      navigate("/login");
    } catch {
      alert("탈퇴 실패");
    }
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h4 className="mb-4">내 정보</h4>

      {/* 기본 정보 */}
      <div className="mb-3">
        <label className="form-label">이메일</label>
        <input className="form-control" value={user.email} disabled />
      </div>

      <div className="mb-3">
        <label className="form-label">이름</label>
        <input
          className="form-control"
          value={user.name || ""}
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
        />
      </div>

      <div className="mb-4">
        <label className="form-label">전화번호</label>
        <input
          className="form-control"
          value={user.phone || ""}
          onChange={(e) =>
            setUser({ ...user, phone: e.target.value })
          }
        />
      </div>

      {/* 🔐 비밀번호 변경 (같은 화면에 자연스럽게 포함) */}
      <h6 className="mt-4 mb-3">비밀번호 변경 (선택)</h6>

      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="현재 비밀번호"
          value={passwordData.currentPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              currentPassword: e.target.value,
            })
          }
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="새 비밀번호"
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              newPassword: e.target.value,
            })
          }
        />
      </div>

      <div className="mb-4">
        <input
          type="password"
          className="form-control"
          placeholder="새 비밀번호 확인"
          value={passwordData.confirmPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              confirmPassword: e.target.value,
            })
          }
        />
      </div>

      {/* 버튼 영역 */}
      <div className="d-flex justify-content-end gap-2">
        <button
          className="btn btn-primary btn-sm"
          onClick={handleUpdate}
        >
          수정
        </button>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleDelete}
        >
          탈퇴
        </button>
      </div>
    </div>
  );
}

export default MyProfile;

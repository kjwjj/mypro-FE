import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import axios from "axios";

// 내 정보에 들어갈 컴포넌트들
// 정보/게시판/문의함/요금제 (+ 관심같은것들을 넣을지 뺄지)
import MyProfile from './MyProfile'
import MyDashBoard from './MyDashBoard'
import MyQuestion from "./MYQuestion"
import MyRatePlan from "./MyRatePlan";

function MyPageForm() {
  const location = useLocation();

  const getTabFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("tab") || "myprofile";
  };

  const [activeTab, setActiveTab] = useState(getTabFromQuery());

  useEffect(() => {
    setActiveTab(getTabFromQuery());
  }, [location.search]);

  // 🔹 비밀번호 확인용
  const [verified, setVerified] = useState(
    localStorage.getItem("mypage_verified") === "true"
  );
  const [password, setPassword] = useState("");


  // ✅ 비밀번호 검증 요청
  const handleVerify = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      await axios.post(
        "http://localhost:8080/api/users/verify-password",
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVerified(true);
      localStorage.setItem("mypage_verified", "true"); // 🔥 추가
    } catch (err) {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const renderComponent = () => {
    switch (activeTab) {
      case "myprofile":
        return <MyProfile />;
      case "mydashboard":
        return <MyDashBoard />;
      case "myquestion":
        return <MyQuestion />;
      case "myrateplan":
        return <MyRatePlan />;
      default:
        return <MyProfile />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case "myprofile":
        return "내 정보 수정";
      case "mydashboard":
        return "내가 작성한 게시물";
      case "myquestion":
        return "문의함";
      case "myrateplan":
        return "요금제";
      default:
        return "";
    }
  };

  // 🔹 아직 비밀번호 확인 안 했으면 → 재확인 화면만
  if (!verified) {
    return (
      <div style={{ marginTop: "120px" }} className="text-center">
        <h2 className="mb-4">비밀번호 재확인</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify();
          }}
        >
          <input
            type="password"
            className="form-control mx-auto mb-3"
            style={{ maxWidth: "320px" }}
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn btn-primary">
            확인
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "80px" }}>
      {/* 🔹 상단 큰 타이틀 영역 */}
      <div className="py-5 text-center">
        <h1 className="font-weight-bold">{getTitle()}</h1>
      </div>

      {/* 🔹 탭 영역 */}
      <Container fluid>
        <Nav tabs className="text-center w-100 d-flex">
          <NavItem style={{ flex: 1 }}>
            <NavLink
              className={classnames("py-3 text-center", {
                active: activeTab === "myprofile",
              })}
              onClick={() => setActiveTab("myprofile")}
              style={{ cursor: "pointer", width: "100%" }}
            >
              내 정보 수정
            </NavLink>
          </NavItem>

          <NavItem style={{ flex: 1 }}>
            <NavLink
              className={classnames("py-3  text-center", {
                active: activeTab === "mydashboard",
              })}
              onClick={() => setActiveTab("mydashboard")}
              style={{ cursor: "pointer", width: "100%" }}
            >
              내가 작성한 게시판
            </NavLink>
          </NavItem>

          <NavItem style={{ flex: 1 }}>
            <NavLink
              className={classnames("py-3  text-center", {
                active: activeTab === "myquestion",
              })}
              onClick={() => setActiveTab("myquestion")}
              style={{ cursor: "pointer", width: "100%" }}
            >
              문의함
            </NavLink>
          </NavItem>

          <NavItem style={{ flex: 1 }}>
            <NavLink
              className={classnames("py-3  text-center", {
                active: activeTab === "myrateplan",
              })}
              onClick={() => setActiveTab("myrateplan")}
              style={{ cursor: "pointer", width: "100%" }}
            >
              요금제
            </NavLink>
          </NavItem>
        </Nav>
        {/* 🔹 컨텐츠 */}
        <div className="py-5">{renderComponent()}</div>
      </Container>
    </div>
  );
}

export default MyPageForm;

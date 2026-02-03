import React, { useState } from "react";
import { Container, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

// 내 정보에 들어갈 컴포넌트들
// 정보/게시판/문의함/요금제 (+ 관심같은것들을 넣을지 뺄지)
import MyProfile from './MyProfile'
import MyDashBoard from './MyDashBoard'
import MyQuestion from "./MYQuestion"
import MyRatePlan from "./MyRatePlan";

function MyPageForm() {
  const [activeTab, setActiveTab] = useState("myprofile");


  // 🔹 비밀번호 확인용 (구조만)
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");


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

  // 🔹 아직 확인 안 했으면 → 이 화면만 보여줌
  if (!verified) {
    return (
      <div style={{ marginTop: "120px" }} className="text-center">
        <h2 className="mb-4">비밀번호 재확인</h2>

        <input
          type="password"
          className="form-control mx-auto mb-3"
          style={{ maxWidth: "320px" }}
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={() => setVerified(true)} // 👉 그냥 통과
        >
          확인
        </button>

        <p className="text-muted mt-3" style={{ fontSize: "14px" }}>
          ※ 현재는 UI 구조만 구현되어 있습니다.
        </p>
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

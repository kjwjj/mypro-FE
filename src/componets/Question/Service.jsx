import React, { useState } from "react";
import { Container, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

import Faq from "./Faq";
import Notice from "./Notice";
import Qna from "./Qna";

function Service() {
  const [activeTab, setActiveTab] = useState("faq");

  const renderComponent = () => {
    switch (activeTab) {
      case "faq":
        return <Faq />;
      case "qna":
        return <Qna />;
      case "notice":
        return <Notice />;
      default:
        return <Faq />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case "faq":
        return "자주 묻는 질문";
      case "qna":
        return "문의하기";
      case "notice":
        return "공지사항";
      default:
        return "";
    }
  };

  return (
    <div style={{ marginTop: "80px" }}>
      {/* 🔹 상단 큰 타이틀 영역 */}
      <div className="py-5 text-center">
        <h1 className="font-weight-bold">{getTitle()}</h1>
      </div>

      {/* 🔹 탭 영역 */}
      <Container fluid>
        <Nav tabs className="text-center w-100">
          <NavItem className="flex-fill">
            <NavLink
              className={classnames("py-3", {
                active: activeTab === "faq",
              })}
              onClick={() => setActiveTab("faq")}
              style={{ cursor: "pointer" }}
            >
              자주 묻는 질문
            </NavLink>
          </NavItem>

          <NavItem className="flex-fill">
            <NavLink
              className={classnames("py-3", {
                active: activeTab === "qna",
              })}
              onClick={() => setActiveTab("qna")}
              style={{ cursor: "pointer" }}
            >
              문의하기
            </NavLink>
          </NavItem>

          <NavItem className="flex-fill">
            <NavLink
              className={classnames("py-3", {
                active: activeTab === "notice",
              })}
              onClick={() => setActiveTab("notice")}
              style={{ cursor: "pointer" }}
            >
              공지사항
            </NavLink>
          </NavItem>
        </Nav>
        {/* 🔹 컨텐츠 */}
        <div className="py-5">{renderComponent()}</div>
      </Container>
    </div>
  );
}

export default Service;

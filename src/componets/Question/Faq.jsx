import React, { useState,useEffect, useRef } from "react";

function Faq() {
  const mainRef = useRef(null);

  useEffect(() => { // 스크롤제어
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, []);

  const [openIndexes, setOpenIndexes] = useState([]);

  const faqList = [
    {
      q: "회원가입은 어떻게 하나요?",
      a: "이메일 또는 SNS 계정을 통해 간편하게 회원가입하실 수 있습니다.",
    },
    {
      q: "AI 추천 매물은 어떤 기준으로 제공되나요?",
      a: "사용자의 선호 조건, 검색 기록, 활동 데이터를 기반으로 최적의 매물을 추천합니다.",
    },
    {
      q: "문의한 내용은 어디서 확인할 수 있나요?",
      a: "문의하기 페이지에서 작성한 문의 내역과 답변 상태를 확인하실 수 있습니다.",
    },

  ];

  const toggleFaq = (idx) => {
    setOpenIndexes((prev) =>
      prev.includes(idx)
        ? prev.filter((i) => i !== idx) // 닫기
        : [...prev, idx]               // 열기
    );
  };

  return (
    <div className="mt-4">
      <div className="border-top">
        {faqList.map((item, idx) => {
          const isOpen = openIndexes.includes(idx);

          return (
            <div key={idx} className="border-bottom">
              {/* 질문 */}
              <div
                onClick={() => toggleFaq(idx)}
                className="d-flex justify-content-between align-items-center py-4"
                style={{ cursor: "pointer" }}
              >
                <span style={{ fontWeight: 600 }}>
                  Q. {item.q}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                    transition: "0.2s",
                  }}
                >
                  ▼
                </span>
              </div>

              {/* 답변 */}
              {isOpen && (
                <div
                  className="px-3 py-3"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <span className="text-muted">
                    A. {item.a}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Faq;

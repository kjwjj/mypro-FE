import React from "react";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import LoginForm from "../LoginForm/LoginForm";

function HeroSection() {
  // 슬라이드 데이터
  const slides = [
    {
      id: 1,
      img: "/img/model.jpg",
      title: "매물 보기",
      desc: "현재 등록되어 있는 매물들을 확인하세요",
      btn: "매물 보기",
    },
    {
      id: 2,
      img: "/img/moving.jpg",
      title: "대출 비교",
      desc: "조건을 입력하고 대출을 비교 받은세요",
      btn: "비교 받기",
    },
    {
      id: 3,
      img: "/img/favicon.jpg",
      title: "주거 추천 서비스",
      desc: "내 조건을 입력하고 최적의 주거지를 추천받으세요",
      btn: "추천 보기",
    },
  ];

  return (
    <>
      {/* HERO 영역 */}
      <section style={{ position: "relative",  height: "calc(100svh - 30px)", overflow:"hidden" }}>
        {/* 배경 슬라이드 */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          slidesPerView={1}
          style={{ height: "100%" }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div style={{ position: "relative", height: "100%" }}>
                {/* 배경 이미지 */}
                <img
                  src={slide.img}
                  alt={slide.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                />

                {/* 중앙 텍스트 오버레이 */}
                <div
                  style={{
                    position: "absolute",
                    top: "80%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(0,0,0,0.45)",
                    padding: "2rem",
                    borderRadius: "1rem",
                    textAlign: "center",
                    maxWidth: "420px",
                    width: "90%",
                  }}
                >
                  <h3 className="text-white mb-2">{slide.title}</h3>
                  <p className="text-white mb-3">{slide.desc}</p>
                  <Button color="primary" block>
                    {slide.btn}
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* PC용 로그인 카드 (오버레이) */}
        {/* <div
          className="d-none d-lg-block"
          style={{
            position: "absolute",
            top: "50%",
            right: "5%",
            transform: "translateY(-50%) scale(0.9)",
            width: "360px",
            zIndex: 10, //레이어 순서 숫자 클수록 위에 표시
          }}
        >
          <LoginForm />
        </div> */}
      </section>

      {/* 모바일용 로그인 카드 (아래로 내려옴) */}
      {/* <div className="d-block d-lg-none px-3 my-4">
        <LoginForm />
      </div> */}
    </>
  );
}

export default HeroSection;

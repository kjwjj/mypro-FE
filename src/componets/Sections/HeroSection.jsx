// import React from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Button,
//   Card,
//   CardBody,
//   Form,
//   FormGroup,
//   Input,
// } from "reactstrap";
// import { useNavigate } from "react-router-dom";

// // Swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Autoplay, Navigation } from "swiper/modules";

// function HeroSection() {
//   const navigate = useNavigate();

//   // 예시 슬라이드 데이터 (폼 + 이미지)
//   const slides = [
//     {
//       id: 1,
//       content: (
//         <div style={{ position: "relative", width: "100%", maxWidth: "400px", margin: "0 auto" }}>
//           {/* 이미지 */}
//           <img
//             src="/src/assets/img/model.jpg"
//             alt="추천"
//             style={{ width: "100%", display: "block" }}
//           />

//           {/* 이미지 중앙 오버레이 글씨 + 버튼 */}
//           <div
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               color: "white",
//               textAlign: "center",
//               backgroundColor: "rgba(0,0,0,0.4)", // 반투명 배경
//               padding: "1rem",
//               borderRadius: "0.5rem",
//               width: "90%", // 텍스트 길이 맞춤
//             }}
//           >
//             <h5 className="text-white">최신 매물 추천</h5>
//             <p className="text-white">AI가 추천하는 내 집 맞춤 매물을 확인하세요!</p>
//             <Button color="primary" block>매물 보기</Button>
//           </div>
//         </div>
//       )
//     },
//     {
//       id: 2,
//       content: (
//         <div style={{ position: "relative", width: "100%", maxWidth: "400px", margin: "0 auto" }}>
//           {/* 이미지 */}
//           <img
//             src="/src/assets/img/moving.jpg"
//             alt="추천"
//             style={{ width: "100%", display: "block" }}
//           />

//           {/* 이미지 중앙 오버레이 글씨 + 버튼 */}
//           <div
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               color: "white",
//               textAlign: "center",
//               backgroundColor: "rgba(0,0,0,0.4)", // 반투명 배경
//               padding: "1rem",
//               borderRadius: "0.5rem",
//               width: "90%", // 텍스트 길이 맞춤
//             }}
//           >
//             <h5 className="text-white">이사 견적 비교</h5>
//             <p className="text-white">여러 이사업체의 견적을 한 번에 비교하세요.</p>
//             <Button color="primary" block>견적 받기</Button>
//           </div>
//         </div>
//       )
//     },
//     {
//       id: 3,
//       content: (
//         <div style={{ position: "relative", width: "100%", maxWidth: "400px", margin: "0 auto" }}>
//           {/* 이미지 */}
//           <img
//             src="/src/assets/img/favicon.jpg"
//             alt="추천"
//             style={{ width: "100%", display: "block" }}
//           />

//           {/* 이미지 중앙 오버레이 글씨 + 버튼 */}
//           <div
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               color: "white",
//               textAlign: "center",
//               backgroundColor: "rgba(0,0,0,0.4)", // 반투명 배경
//               padding: "1rem",
//               borderRadius: "0.5rem",
//               width: "90%", // 텍스트 길이 맞춤
//             }}
//           >
//             <h5 className="mb-2">주거 추천 서비스</h5>
//             <p className="mb-3">내 생활 패턴에 맞는 최적의 주거지를 추천받으세요.</p>
//             <Button color="primary" block>추천 보기</Button>
//           </div>
//         </div>
//       )
//     }
//   ];

//   return (
//     <section className="section section-shaped section-lg">
//       <div className="shape shape-style-1 bg-gradient-dark">
//         <span />
//         <span />
//         <span />
//         <span />
//       </div>

//       <Container fluid className="py-lg-7">
//         <Row className="align-items-center">
//           {/* 왼쪽 슬라이드 영역 */}
//           <Col lg="6">
//             <Swiper
//               modules={[Navigation, Autoplay]}
//               navigation
//               loop={true} // 마지막-처음 연결
//               autoplay={{ delay: 3000 }} // 3초마다 자동 슬라이드
//               spaceBetween={50}
//               slidesPerView={1}
//             >
//               {slides.map((slide) => (
//                 <SwiperSlide key={slide.id}>
//                   <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
//                     {slide.content}
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </Col>

//           {/* 오른쪽 로그인 박스 */}
//           <Col lg="4" className="ml-lg-auto mt-5 mt-lg-0">
//             <Card className="shadow border-0">
//               <CardBody className="px-lg-4 py-lg-4">
//                 <div className="text-center mb-3">
//                   <h5 className="mb-0">로그인</h5>
//                 </div>

//                 <Form>
//                   <FormGroup className="mb-2">
//                     <Input type="email" placeholder="이메일" bsSize="sm" />
//                   </FormGroup>
//                   <FormGroup className="mb-2">
//                     <Input type="password" placeholder="비밀번호" bsSize="sm" />
//                   </FormGroup>

//                   <Row className="mb-3">
//                     <Col xs="6" className="pe-1">
//                       <Button
//                         color="primary"
//                         size="sm"
//                         block
//                         onClick={() => navigate("/login")}
//                       >
//                         로그인
//                       </Button>
//                     </Col>
//                     <Col xs="6" className="ps-1">
//                       <Button
//                         color="light"
//                         size="sm"
//                         block
//                         onClick={() => navigate("/signup")}
//                       >
//                         회원가입
//                       </Button>
//                     </Col>
//                   </Row>

//                   <Row>
//                     <Col xs="4" className="pe-1">
//                       <Button
//                         style={{ backgroundColor: "#ff0404", color: "#fff" }}
//                         size="sm"
//                         block
//                       >
//                         Google
//                       </Button>
//                     </Col>
//                     <Col xs="4" className="px-1">
//                       <Button
//                         style={{ backgroundColor: "#03C75A", color: "#fff" }}
//                         size="sm"
//                         block
//                       >
//                         N 네이버
//                       </Button>
//                     </Col>
//                     <Col xs="4" className="ps-1">
//                       <Button
//                         style={{ backgroundColor: "#FEE500", color: "#000" }}
//                         size="sm"
//                         block
//                       >
//                         K 카카오
//                       </Button>
//                     </Col>
//                   </Row>
//                 </Form>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// }

// export default HeroSection;
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
      img: "/src/assets/img/model.jpg",
      title: "최신 매물 추천",
      desc: "AI가 추천하는 내 집 맞춤 매물을 확인하세요",
      btn: "매물 보기",
    },
    {
      id: 2,
      img: "/src/assets/img/moving.jpg",
      title: "대출 비교",
      desc: "조건을 입력하고 대출을 비교 받은세요",
      btn: "비교 받기",
    },
    {
      id: 3,
      img: "/src/assets/img/favicon.jpg",
      title: "주거 추천 서비스",
      desc: "내 생활 패턴에 맞는 최적의 주거지를 추천받으세요",
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

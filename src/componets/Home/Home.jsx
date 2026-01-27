import React, { useEffect, useRef } from "react";

import HeroSection from "../../Sections/HeroSection";
import ServiceSection from "../../Sections/ServiceSection";
import RecommendSection from "../../Sections/RecommendSection";


function Home() {
  const mainRef = useRef(null);

  useEffect(() => { //스크롤제어
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, []);

  return (
    <>
      <main ref={mainRef}>
        <HeroSection />
        <ServiceSection />
        <RecommendSection />
      </main>
    </>
  );
}

export default Home;

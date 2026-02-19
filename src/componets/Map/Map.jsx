import { useEffect, useRef } from "react";

function Map({ center, houses }) {
  const mapRef = useRef(null);
  const kakaoMap = useRef(null);
  const markersRef = useRef([]);
  const infoWindowsRef = useRef([]);

  // 지도 최초 생성
  useEffect(() => {
    if (!window.kakao) return;

    window.kakao.maps.load(() => {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(center.lat, center.lng),
        level: 5,
      };
      kakaoMap.current = new window.kakao.maps.Map(container, options);
    });
  }, []);

  // houses 변경 시 마커 생성
  useEffect(() => {
    if (!kakaoMap.current || !houses) return;

    // 기존 마커 & infoWindow 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    infoWindowsRef.current.forEach((info) => info.close());
    markersRef.current = [];
    infoWindowsRef.current = [];

    houses.forEach((house) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(house.address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const position = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          const marker = new window.kakao.maps.Marker({
            map: kakaoMap.current,
            position,
            title: house.name,
          });

          // 인포윈도우 div 생성
          const content = document.createElement("div");
          content.style.position = "relative"; // 닫기 버튼 위치 지정
          content.style.padding = "8px";
          content.style.maxWidth = "220px";
          content.style.fontSize = "12px";
          content.innerHTML = `
            <strong>${house.name}</strong><br/>
            ${house.address}<br/>
            가격: ${house.price}만 | 방: ${house.rooms}개 | ${house.type}<br/>
          `;

          // 닫기 버튼
          const closeBtn = document.createElement("button");
          closeBtn.textContent = "✕";
          closeBtn.style.cssText = `
            position: absolute;
            top: 4px;
            right: 4px;
            background: #ff5c5c;
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            cursor: pointer;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            padding: 0;
          `;
          content.appendChild(closeBtn);

          const infoWindow = new window.kakao.maps.InfoWindow({ content });

          // 마커 클릭 시 infoWindow 열기
          window.kakao.maps.event.addListener(marker, "click", () => {
            infoWindowsRef.current.forEach((info) => info.close());
            infoWindow.open(kakaoMap.current, marker);
          });

          // 닫기 버튼 클릭
          closeBtn.addEventListener("click", () => infoWindow.close());

          markersRef.current.push(marker);
          infoWindowsRef.current.push(infoWindow);
        }
      });
    });
  }, [houses]);

  // center 변경 시 지도 이동 + 확대
  useEffect(() => {
    if (!kakaoMap.current) return;

    const moveLatLng = new window.kakao.maps.LatLng(center.lat, center.lng);
    kakaoMap.current.setLevel(2, { animate: true });
    kakaoMap.current.panTo(moveLatLng);
  }, [center]);

  return <div id="map" ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}

export default Map;

import { useEffect, useRef } from "react";

function Map({ center }) {
  const mapRef = useRef(null);      // map div
  const kakaoMap = useRef(null);    // 지도 객체
  const markerRef = useRef(null);   // 마커

  // 1️⃣ 지도 최초 1회 생성
  useEffect(() => {
    if (!window.kakao) return;

    window.kakao.maps.load(() => {
      const container = mapRef.current;

      const options = {
        center: new window.kakao.maps.LatLng(
          center.lat,
          center.lng
        ),
        level: 9,
      };

      kakaoMap.current = new window.kakao.maps.Map(container, options);
    });
  }, []);

  // 2️⃣ center 변경 시 지도 이동
  useEffect(() => {
    if (!kakaoMap.current) return;

    const moveLatLng = new window.kakao.maps.LatLng(
      center.lat,
      center.lng
    );

    // ⭐ 1. 지도 확대
    kakaoMap.current.setLevel(3, { animate: true }); // 숫자 ↓ = 확대

    // ⭐ 2. 중심 이동
    kakaoMap.current.panTo(moveLatLng);

    // ⭐ 3. 마커 위치만 변경 (새로 만들지 않음)
    if (!markerRef.current) {
      markerRef.current = new window.kakao.maps.Marker({
        position: moveLatLng,
        map: kakaoMap.current,
      });
    } else {
      markerRef.current.setPosition(moveLatLng);
    }
  }, [center]);

  return <div id="map" ref={mapRef} />;
}

export default Map;

import { useEffect } from "react";

function Map() {
  useEffect(() => {
    if (!window.kakao) return;

    window.kakao.maps.load(() => {
      const container = document.getElementById("map");

      const options = {
        center: new window.kakao.maps.LatLng(36.983251, 127.2211483),
        level: 9,
      };

      new window.kakao.maps.Map(container, options);
    });
  }, []);

  return <div id="map" />;
}

export default Map;

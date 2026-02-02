import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

function DashBoard() {
  const [geoData, setGeoData] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");

  // 예시 시도별 데이터
  const koreaData = [
    { code: "11010", name: "종로구", value: 1000 },
    { code: "41010", name: "수원시", value: 500 },
    { code: "26010", name: "부산진구", value: 300 },
  ];

  useEffect(() => {
    fetch("/korea.json") // public 폴더에 TopoJSON
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!geoData) return <div>Loading...</div>;

  // 색상 결정
  const maxValue = Math.max(...koreaData.map((d) => d.value));
  const getColor = (value) => {
    const intensity = Math.floor((value / maxValue) * 200);
    return `rgb(255, ${255 - intensity}, ${255 - intensity})`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card className="shadow-sm">
        <CardHeader>
          <h5>한국 지도 (마우스 올리면 이름+숫자 표시)</h5>
        </CardHeader>
        <CardBody style={{ height: "500px", padding: 0, position: "relative" }}>
          {/* 툴팁 */}
          {tooltipContent && (
            <div
              style={{
                position: "absolute",
                background: "rgba(0,0,0,0.7)",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "4px",
                top: 10,
                right: 10,
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              {tooltipContent}
            </div>
          )}

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 4000, center: [127.5, 36] }}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={geoData}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const cur = koreaData.find(
                    (s) => s.code === geo.properties.code
                  );
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={cur ? getColor(cur.value) : "#EEE"}
                      stroke="#333"
                      onMouseEnter={() => {
                        if (cur)
                          setTooltipContent(`${cur.name}: ${cur.value}명`);
                      }}
                      onMouseLeave={() => setTooltipContent("")}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", cursor: "pointer" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </CardBody>
      </Card>
    </div>
  );
}

export default DashBoard;

import Map from "./Map";
import "./MapPage.css";

function MapPage() {
  return (
    <div className="map-page">
      {/* 왼쪽 지도 */}
      <div className="map-area">
        <Map />
      </div>

      {/* 오른쪽 필터 */}
      <div className="filter-area">
        <h4>매물 필터</h4>

        <label>가격</label>
        <select>
          <option>전체</option>
        </select>

        <label>주거 형태</label>
        <select>
          <option>전체</option>
          <option>아파트</option>
          <option>빌라</option>
          <option>주택</option>
        </select>

        <label>방 개수</label>
        <select>
          <option>전체</option>
        </select>
      </div>
    </div>
  );
}

export default MapPage;

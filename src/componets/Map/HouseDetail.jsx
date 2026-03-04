import "./HouseDetail.css";

function HouseDetail({ house, onClose, onBack }) {
  console.log(house);
  return (
    <div className="detail-panel">
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>← 뒤로가기</button>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <h2>{house.name}</h2>
      <p>{house.address}</p>
      <p>주거형태: {house.type}</p>
      <p>방 개수: {house.rooms}</p>
      <p>조회수: {house.viewCount}</p>

      {/* 가격 정보 */}
      {house.listing && (
        <p>
          가격: {house.listing.tradeType === "MONTHLY"
            ? `월세 ${house.listing.deposit}/${house.listing.rent}`
            : house.listing.tradeType === "JEONSE"
              ? `전세 ${house.listing.deposit}`
              : `매매 ${house.listing.salePrice}`}
        </p>
      )}

      {/* 상세 설명 */}
      {house.context && (
        <div className="description-box">
          <p>{house.context}</p>
        </div>
      )}

      {/* 이미지 */}
      {house.imagePath && (
        <img
          src={`http://localhost:8080/images/${house.imagePath.split(",")[0]}`}
          alt={house.name}
          className="detail-img"
        />
      )}

      {/* 목록 버튼 */}
      <div className="detail-footer">
        <button className="list-btn" onClick={onClose}>
          📋 목록으로
        </button>
      </div>
    </div>
  );
}

export default HouseDetail;
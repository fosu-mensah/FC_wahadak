import React from "react";
import { Row, Col } from "reactstrap";
import "../../../../src/assets/scss/seasons/seasonSelector.scss";

const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../../../assets/images/seasons', false, /\.(png|jpe?g|svg)$/));

const seasonImages = Object.keys(images).map(key => ({
    id: key.replace('.png', ''),
    src: images[key],
    alt: key.replace('.png', '')
}));

const SeasonImageSelector = ({ selectedSeason, onSelect }) => {
    const handleClick = (seasonId) => {
        if (selectedSeason === seasonId) {
            onSelect(null); // 이미 선택된 시즌을 다시 클릭하면 선택 해제
        } else {
            onSelect(seasonId);
        }
    };

    return (
        <Row className="season-image-grid">
            {seasonImages.map((season) => (
                <Col key={season.id} xs="2" md="1" className="season-image-wrapper">
                    <img
                        src={season.src}
                        alt={season.alt}
                        className={`season-image ${selectedSeason === season.id ? "selected" : ""}`}
                        onClick={() => handleClick(season.id)}
                        style={{ cursor: "pointer", border: selectedSeason === season.id ? "2px solid purple" : "none" }}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default SeasonImageSelector;

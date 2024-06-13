import React from "react";

const Enhancement = ({ enhancementLevel }) => {
    const imageUrl = `${process.env.PUBLIC_URL}/assets/images/${enhancementLevel}.png`;

    return (
        <div className="player-detail">
            <h1>Player Detail</h1>
            <div className="enhancement-level">
                <img src={imageUrl} alt={`Enhancement Level ${enhancementLevel}`} />
                <p>강화 단계: {enhancementLevel}</p>
            </div>
        </div>
    );
};

export default Enhancement;

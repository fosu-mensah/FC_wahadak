import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../../api/apiClient";
import "../../../assets/scss/playerDetail/playerDetail.scss";
import "../../../../src/assets/scss/statColor/statColor.scss";

const PlayerDetails = () => {
    const { pid } = useParams();
    const [player, setPlayer] = useState(null);
    const [enhancementLevel, setEnhancementLevel] = useState(1);
    const [selectedTeamColor, setSelectedTeamColor] = useState("");

    const fetchPlayerDetails = async (level) => {
        try {
            const response = await apiClient.get(`/players/stats/${pid}`, {
                params: { enhancementLevel: level }
            });
            if (response.status === 200 && response.data.length > 0) {
                const players = response.data.map(player => ({
                    ...player,
                    "시즌 URL": player["시즌 URL"].replace('/Users/leeeunhak/Desktop/images/', 'assets/images/seasons/')
                }));
                setPlayer(players[0]);
                console.log(players);
            }
        } catch (error) {
            console.error("Error fetching player details:", error);
        }
    };

    useEffect(() => {
        fetchPlayerDetails(enhancementLevel);
    }, [pid, enhancementLevel]);

    const handleEnhancementChange = (e) => {
        const level = parseInt(e.target.value, 10);
        setEnhancementLevel(level);
    };

    const handleTeamColorChange = (e) => {
        setSelectedTeamColor(e.target.value);
    };

    if (!player) {
        return <div>Loading...</div>;
    }

    const mainStats = [
        "Speed", "Shot", "Pass", "Dribble", "Defense", "Pysicial"
    ];

    const detailedStats = Object.entries(player).filter(([key, value]) => {
        return !mainStats.includes(key) && ![
            "선수이름", "이미지 URL", "국적", "포지션", "키", "몸무게", "급여", "포지션 스탯",
            "생년 월일", "체형", "개인기", "발", "유명도", "1카 평균 거래 BP", "클럽 경력", "팀 컬러",
            "maxPositionStat","시즌","시즌 URL","특성"
        ].includes(key);
    });

    const getStatColorClass = (value) => {
        if (value <= 59) return 'stat-color-0-59';
        if (value <= 69) return 'stat-color-60-69';
        if (value <= 79) return 'stat-color-70-79';
        if (value <= 89) return 'stat-color-80-89';
        if (value <= 99) return 'stat-color-90-99';
        if (value <= 109) return 'stat-color-100-109';
        if (value <= 119) return 'stat-color-110-119';
        if (value <= 129) return 'stat-color-120-129';
        if (value <= 139) return 'stat-color-130-139';
        return 'stat-color-140-149';
    };

    return (
        <div className="player-details">
            <div className="player-header">
                <img
                    src={`${player["시즌 URL"]}`}
                    alt={`시즌 ${player["시즌"]}`}
                    className="season-image"
                />
                <h3>{player["선수이름"]}</h3>
            </div>
            <div className="player-card">
                <img src={player["이미지 URL"]} alt={player["선수이름"]} className="player-image"/>
                <div className="player-info">
                    <p><strong>국적:</strong> {player["국적"]}</p>
                    <p><strong>포지션:</strong> {player["포지션"]}</p>
                    <p><strong>키:</strong> {player["키"]} cm</p>
                    <p><strong>몸무게:</strong> {player["몸무게"]} kg</p>
                    <p><strong>OVR:</strong> {player["maxPositionStat"]}</p>
                </div>
            </div>
            <div>
                <label htmlFor="enhancementLevel">강화 단계:</label>
                <input
                    type="number"
                    id="enhancementLevel"
                    name="enhancementLevel"
                    min="1"
                    max="10"
                    value={enhancementLevel}
                    onChange={handleEnhancementChange}
                />
            </div>
            <div className="ProfileCard-description">
                <strong>급여:</strong> {player["급여"]} - {player["포지션 스탯"] ?
                Object.entries(player["포지션 스탯"]).map(([key, value], index) => (
                    <span key={key}>
                    <strong>{key}:</strong> {value}
                        {index < Object.entries(player["포지션 스탯"]).length - 1 ? ' ' : ''}
                  </span>
                ))
                : null}
            </div>
            <div>
                <strong>생년 월일:</strong> {player["생년 월일"]}
            </div>
            <div>
                <strong>체형:</strong> {player["체형"]}
            </div>
            <div>
                <strong>개인기:</strong> {player["개인기"]}
            </div>
            <div>
                <strong>발:</strong> {player["발"]}
            </div>
            <div>
                <strong>유명도:</strong> {player["유명도"]}
            </div>
            <div>
                <strong>1카 평균 거래 BP:</strong> {player["1카 평균 거래 BP"]}
            </div>
            <div>
                <strong>클럽 경력:</strong>
                <ul>
                    {player["클럽 경력"].map((club, index) => (
                        <li key={index}>{club["club"]} - {club["year"]}</li>
                    ))}
                </ul>
            </div>
            <div>
                <strong>팀 컬러:</strong>
                <select onChange={handleTeamColorChange} value={selectedTeamColor}>
                    <option value="">팀 컬러 선택</option>
                    {player["팀 컬러"].map((color, index) => (
                        <option key={index} value={color}>{color}</option>
                    ))}
                </select>
                {selectedTeamColor && (
                    <div>
                        <h2>{selectedTeamColor}</h2>
                        {/* 여기에 팀 컬러와 관련된 추가 정보를 표시할 수 있습니다. */}
                    </div>
                )}
            </div>
            <div className="stat-section">
                <div className="stat-list">
                    <strong>메인 스탯:</strong>
                    <ul>
                        {mainStats.map(stat => (
                            <li key={stat}>
                                <strong>{stat}:</strong>
                                <span className={getStatColorClass(player[stat])}>
                                    {player[stat]}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="stat-list">
                    <strong>상세 스탯:</strong>
                    <ul>
                        {detailedStats.map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong>
                                <span className={getStatColorClass(value)}>
                                    {value}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default PlayerDetails;

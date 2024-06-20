import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import '../../../assets/scss/playerDetail/playerDetail.scss';
import '../../../../src/assets/scss/statColor/statColor.scss';

const nation = {
    '알바니아': 'Albania.png',
    '알제리': 'Algeria.png',
    '아르헨티나': 'Argentina.png',
    '아르메니아': 'Armenia.png',
    '호주': 'Australia.png',
    '오스트리아': 'Austria.png',
    '아제르바이잔': 'Azerbaijan.png',
    '바레인': 'Bahrain.png',
    '방글라데시': 'Bangladesh.png',
    '벨기에': 'Belgium.png',
    '볼리비아': 'Bolivia.png',
    '보스니아 & 헤르체고비나': 'Bosnia & Herzegovina.png',
    '브라질': 'Brazil.png',
    '불가리아': 'Bulgaria.png',
    '카메룬': 'Cameroon.png',
    '캐나다': 'Canada.png',
    '칠레': 'Chile.png',
    '중국': 'China.png',
    '콜롬비아': 'Colombia.png',
    '콩고-브라자빌': 'Congo-Brazzaville.png',
    '프랑스': 'france.png',
    '크로아티아': 'Croatia.png',
    '덴마크': 'Denmark.png',
    '에콰도르': 'Ecuador.png',
    '이집트': 'Egypt.png',
    '잉글랜드': 'England.png',
    '핀란드': 'Finland.png',
    '가봉': 'Gabon.png',
    '조지아': 'Georgia.png',
    '독일': 'Germany.png',
    '가나': 'Ghana.png',
    '그리스': 'Greece.png',
    '헝가리': 'Hungary.png',
    '아이슬란드': 'Iceland.png',
    '이란': 'Iran.png',
    '이라크': 'Iraq.png',
    '아일랜드': 'Ireland.png',
    '이탈리아': 'Italy.png',
    '자메이카': 'Jamaica.png',
    '일본': 'Japan.png',
    '대한민국': 'Korea.png',
    '루마니아': 'Romania.png',
    '러시아': 'Russia.png',
    '스코틀랜드': 'Scotland.png',
    '세네갈': 'Senegal.png',
    '세르비아': 'Serbia.png',
    '슬로바키아': 'Slovakia.png',
    '슬로베니아': 'Slovenia.png',
    '스페인': 'Spain.png',
    '스웨덴': 'Sweden.png',
    '스위스': 'Switzerland.png',
    '터키': 'Turkey.png',
    '우크라이나': 'Ukraine.png',
    '우루과이': 'Uruguay.png',
    '미국': 'USA.png',
    '우즈베키스탄': 'Uzbekistan.png',
    '베네수엘라': 'Venezuela.png',
    '웨일스': 'Wales.png',
    '포르투갈' : 'Portugal.png',
    '폴란드' : 'Poland.png'
}

const PlayerDetails = () => {
    const { pid } = useParams();
    const [player, setPlayer] = useState(null);
    const [enhancementLevel, setEnhancementLevel] = useState(1);
    const [playerLevel, setPlayerLevel] = useState(1);
    const [selectedTeamColor, setSelectedTeamColor] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);

    const fetchPlayerDetails = async (level) => {
        try {
            const response = await apiClient.get(`/players/stats/${pid}`, {
                params: { enhancementLevel: level }
            });
            console.log(response);
            if (response.status === 200 && response.data.length > 0) {
                const players = response.data.map(player => ({
                    ...player,
                    "시즌 URL": player["시즌 URL"].replace('/Users/leeeunhak/Desktop/images/', '/FC_wahadak/assets/images/seasons/')
                }));
                setPlayer(players[0]);
            }
        } catch (error) {
            console.error("Error fetching player details:", error);
        }
    };

    useEffect(() => {
        fetchPlayerDetails(enhancementLevel);
    }, [pid, enhancementLevel]);

    const handleEnhancementChange = (level) => {
        setEnhancementLevel(level);
        fetchPlayerDetails(level);
        setIsDropdownOpen(false); // 드롭다운 닫기
    };

    const handleLevelChange = (level) => {
        setPlayerLevel(level);
        setIsLevelDropdownOpen(false); // 드롭다운 닫기
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLevelDropdownToggle = () => {
        setIsLevelDropdownOpen(!isLevelDropdownOpen);
    }

    const handleTeamColorChange = (e) => {
        setSelectedTeamColor(e.target.value);
    };

    if (!player) {
        return <div>Loading...</div>;
    }

    const mainStatsGK = ["Diving", "Handling", "Kick", "Reactions", "GK Speed", "GK Position"];
    const mainStatsField = ["Speed", "Shot", "Pass", "Dribble", "Defense", "Pysicial"];
    const detailedStats = Object.entries(player).filter(([key]) => {
        return !mainStatsGK.includes(key) && !mainStatsField.includes(key) && ![
            "선수이름", "이미지 URL", "국적", "포지션", "키", "몸무게", "급여", "포지션 스탯",
            "생년 월일", "체형", "개인기", "발", "유명도", "1카 평균 거래 BP", "클럽 경력", "팀 컬러",
            "maxPositionStat", "시즌", "시즌 URL", "특성"
        ].includes(key);
    });

    const applyLevelBonus = (stat) => {
        return stat + playerLevel - 1;
    };

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
            <div style={{fontSize:'3rem',marginBottom:'1rem'}}>선수 검색 결과</div>
            <div className="player-info-wrapper">
                <div className="player-card">
                    <div className="player-header">
                        <img
                            src={`${player["시즌 URL"]}`}
                            alt={`시즌 ${player["시즌"]}`}
                            className="season-image"
                        />
                        <h2>{player["선수이름"]}</h2>
                    </div>
                    <img src={player["이미지 URL"]} alt={player["선수이름"]} className="player-image"/>
                    <div className="enhancement-wrapper" onClick={handleDropdownToggle}>
                        <img
                            src={`/FC_wahadak/assets/images/enhancement/${enhancementLevel}.png`}
                            alt={`${enhancementLevel}강`}
                            className="enhancement-image"
                        />
                    </div>
                    <div className="level-wrapper">
                        <div className={`custom-select ${isLevelDropdownOpen ? "open" : ""}`}
                             onClick={handleLevelDropdownToggle}>
                            <div className="custom-select-trigger">
                                <span>Lv.{playerLevel}</span>
                            </div>
                            <ul className={`custom-options ${isLevelDropdownOpen ? "open" : ""}`}>
                                {[...Array(5)].map((_, i) => (
                                    <li key={i + 1} onClick={() => handleLevelChange(i + 1)}>
                                        <span>Lv.{i + 1}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="player-info" style={{marginTop:'1rem'}}>
                        <p>
                            <strong>국적:</strong>
                            {nation[player["국적"]] && (
                                <img
                                    src={`/FC_wahadak/assets/images/nation/${nation[player["국적"]]}`}
                                    alt={player["국적"]}
                                    className="nationality-image"
                                    style={{width: '40px', height: '30px', marginLeft: '5px', marginBottom: '3px'}}
                                />
                            )}
                            {player["국적"]}{" "}
                        </p>
                        <p><strong>포지션:</strong> {player["포지션"]}</p>
                        <p><strong>키:</strong> {player["키"]} cm</p>
                        <p><strong>몸무게:</strong> {player["몸무게"]} kg</p>
                        <p><strong>OVR:</strong> {applyLevelBonus(player["maxPositionStat"])}</p>
                    </div>
                    {isDropdownOpen && (<div className="custom-select-wrapper">
                        <div className="custom-select open">
                            <ul className="custom-options open"> {[...Array(10)].map((_, i) => (
                                <li key={i + 1} onClick={() => handleEnhancementChange(i + 1)}><img
                                    src={`/FC_wahadak/assets/images/enhancement/${i + 1}.png`} alt={`${i + 1}강`}
                                    className="enhancement-image"/></li>))} </ul>
                        </div>
                    </div>)}
                </div>
                <div className="ProfileCard-description">
                    <div>
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
                        <strong>특성:</strong> {player["특성"]}
                    </div>
                    <div>
                        <strong>유명도:</strong> {player["유명도"]}
                    </div>
                    <div>
                        <strong>1카 평균 거래 BP:</strong> {player["1카 평균 거래 BP"]} BP
                    </div>
                    <div>
                        <strong style={{marginTop:'0.8rem',marginBottom:'0.8rem', marginLeft:'6rem'}}>클럽 경력</strong>
                        <ul>
                            {player["클럽 경력"].map((club, index) => (
                                <li key={index}>● {club["club"]} - {club["year"]}</li>
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
                </div>
            </div>
            <div className="player-stats">
                {player["포지션"] === "GK" ? (
                    <div className="goalkeeper-stats">
                        {mainStatsGK.map(stat => (
                            <div className="stat" key={stat}>
                                <strong>{stat} </strong>
                                <span
                                    className={getStatColorClass(applyLevelBonus(player[stat]))}>{applyLevelBonus(player[stat])}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="field-player-stats">
                        {mainStatsField.map(stat => (
                            <div className="stat" key={stat}>
                                <strong>{stat} </strong>
                                <span
                                    className={getStatColorClass(applyLevelBonus(player[stat]))}>{applyLevelBonus(player[stat])}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="stat-section" style={{fontSize:'1rem'}}>
                <div className="stat-list">
                    <ul>
                        {detailedStats.slice(0, Math.ceil(detailedStats.length / 3)).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}</strong>
                                <span className={getStatColorClass(applyLevelBonus(value))}>
                                    {applyLevelBonus(value)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="stat-list">
                    <ul>
                        {detailedStats.slice(Math.ceil(detailedStats.length / 3), Math.ceil(detailedStats.length * 2 / 3)).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}</strong>
                                <span className={getStatColorClass(applyLevelBonus(value))}>
                                    {applyLevelBonus(value)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="stat-list">
                    <ul>
                        {detailedStats.slice(Math.ceil(detailedStats.length * 2 / 3)).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}</strong>
                                <span className={getStatColorClass(applyLevelBonus(value))}>
                                    {applyLevelBonus(value)}
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

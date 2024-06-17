import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../api/apiClient";
import SeasonImageSelector from "./SeasonImageSelector";
import "../../../../src/assets/scss/seasonsearch/seasonsearch.scss";
import "../../../../src/assets/scss/statColor/statColor.scss";


const PlayerSearch = () => {
    const [pname, setPname] = useState("");
    const [season, setSeason] = useState("");
    const [enhancementLevel, setEnhancementLevel] = useState(1);
    const [searchResult, setSearchResult] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        setSpinner(true);

        try {
            const response = await apiClient.get("/players/search", {
                params: { pname, season, enhancementLevel },
            });
            console.log(response);
            if (response.status === 200) {
                const players = response.data.map(player => ({
                    ...player,
                    "시즌 URL": player["시즌 URL"].replace('/Users/leeeunhak/Desktop/images/', 'assets/images/seasons/')
                }));
                setSearchResult(players);
            } else {
                setSearchResult([]);
            }
        } catch (error) {
            console.error("Error searching player:", error);
            setSearchResult([]);
        } finally {
            setSpinner(false);
        }
    };

    const handlePlayerClick = (pid) => {
        navigate(`${process.env.PUBLIC_URL}/player/${pid}`);
    };

    const getEnhancementImage = (level) => {
        return `${process.env.PUBLIC_URL}/assets/images/enhancement/${level}.png`;
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
        if (value <= 149) return 'stat-color-140-149';
        return "stat-color-150-159"
    };

    return (
        <div className="player-search">
            <h1>선수 상세 검색</h1>
            <Form onSubmit={handleSearch}>
                <FormGroup>
                    <Label for="pname">선수 이름</Label>
                    <Input
                        type="text"
                        name="pname"
                        id="pname"
                        value={pname}
                        onChange={(e) => setPname(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="season">시즌</Label>
                    <SeasonImageSelector selectedSeason={season} onSelect={setSeason}/>
                </FormGroup>
                <FormGroup>
                    <Label for="enhancementLevel">강화 단계</Label>
                    <Input
                        type="number"
                        name="enhancementLevel"
                        id="enhancementLevel"
                        min="1"
                        max="10"
                        value={enhancementLevel}
                        onChange={(e) => setEnhancementLevel(e.target.value)}
                    />
                </FormGroup>
                <Button type="submit" color="primary" disabled={spinner}>
                    {spinner ? "검색 중..." : "검색"}
                </Button>
            </Form>
            <div className="search-result">
                {searchResult.length > 0 ? (
                    searchResult.map((player, index) => (
                        <div key={index} className="player-card" onClick={() => handlePlayerClick(player.pid)}>
                            <div className="player-header">
                                <img
                                    src={`${player["시즌 URL"]}`}
                                    alt={`시즌 ${player["시즌"]}`}
                                    className="season-image"
                                /><h3>{player["선수이름"]}</h3>
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
                            <img
                                src={player["이미지 URL"]}
                                alt={player["선수이름"]}
                                className="player-profile-image"
                            />
                            <div className="player-info">
                                <p><strong>시즌:</strong> {player["시즌"]}</p>
                                <p><strong>국적:</strong> {player["국적"]}</p>
                                <p><strong>생년월일:</strong> {player["생년 월일"]}</p>
                                <p><strong>키:</strong> {player["키"]}cm - <strong>몸무게:</strong> {player["몸무게"]}kg</p>
                                <p><strong>체형:</strong> {player["체형"]}</p>
                                <p><strong>주발:</strong> {player["발"]}</p>
                            </div>
                            <div className="player-stats">
                                {player["포지션"] === "GK" ? (
                                    <div className="goalkeeper-stats">
                                        <div className={`stat ${getStatColorClass(player["다이빙"])}`}><strong>다이빙</strong><span>{player["다이빙"]}</span></div>
                                        <div className={`stat ${getStatColorClass(player["골핸들링"])}`}><strong>골핸들링</strong><span>{player["골핸들링"]}</span></div>
                                        <div className={`stat ${getStatColorClass(player["킥"])}`}><strong>킥</strong><span>{player["킥"]}</span></div>
                                        <div className={`stat ${getStatColorClass(player["반응속도"])}`}>
                                            <strong>반응속도</strong><span>{player["반응속도"]}</span>
                                        </div>
                                        <div className={`stat ${getStatColorClass(player["GK 스피드"])}`}><strong>GK 스피드</strong><span>{player["GK 스피드"]}</span></div>
                                        <div className={`stat ${getStatColorClass(player["위치선정"])}`}><strong>위치선정</strong><span>{player["위치선정"]}</span></div>
                                    </div>
                                ) : (
                                    <div className="field-player-stats">
                                        <div className={`stat ${getStatColorClass(player["스피드"])}`}><strong>스피드</strong><span>{player["스피드"]}</span></div>
                                        <div className={`stat ${getStatColorClass(player["슛"])}`}><strong>슛</strong><span>{player["슛"]}</span></div>
                                        <div className={`stat ${getStatColorClass(player["패스"])}`}><strong>패스</strong><span>{player["패스"]}</span></div>
                                        <div className={`stat ${getStatColorClass(player["드리블"])}`}><strong>드리블</strong><span>{player["드리블"]}</span></div>
                                        <div className={`stat ${getStatColorClass(player["수비"])}`}><strong>수비</strong><span>{player["수비"]}</span></div>
                                        <div className={`stat ${getStatColorClass(player["피지컬"])}`}><strong>피지컬</strong><span>{player["피지컬"]}</span></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default PlayerSearch;

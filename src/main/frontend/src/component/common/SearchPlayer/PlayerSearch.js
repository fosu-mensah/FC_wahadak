import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../api/apiClient";
import SeasonImageSelector from "../../common/SearchPlayer/SeasonImageSelector";
import "../../../../src/assets/scss/seasonsearch/seasonsearch.scss";
import "../../../../src/assets/scss/statColor/statColor.scss";

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
        if (value <= 159) return 'stat-color-150-159'
        return "stat-color-160-169";
    };

    return (
        <div className="player-search">
            <div style={{textAlign:'center', fontSize:'3rem',marginBottom:'2rem'}}>선수 검색</div>
            <Form onSubmit={handleSearch}>
                <FormGroup>
                    <Label for="pname" style={{fontSize:'1.5rem'}}>선수 이름</Label>
                    <Input style={{width: '30%', height: '3rem',
                        padding: "10px", border: "2px solid #007bff",
                        justifyItems:'center',
                        borderRadius: '5px',
                        fontSize: "1rem",
                        fontWeight : 'normal',
                        transition: 'border-color 0.3s', boxShadow: '0.3s'}}
                        type="text"
                        name="pname"
                        id="pname"
                        value={pname}
                        onChange={(e) => setPname(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="seasons">
                    <Label for="season" style={{fontSize: '1.5rem', marginLeft:'-0.8rem'}}>시즌 선택</Label>
                    <SeasonImageSelector selectedSeason={season} onSelect={setSeason}/>
                </FormGroup>
                <FormGroup>
                    <Label for="enhancementLevel" style={{fontSize: '1.5rem'}}>강화 단계</Label>
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
                <Button type="submit" color="primary" disabled={spinner} style={{width:'8rem',height:'4rem', fontSize:'1.5rem'}}>
                    {spinner ? "검색 중" : "검색"}
                </Button>
            </Form>
            <div className="search-result" style={{marginTop:'1rem'}}>
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
                                <p>
                                    <strong>국적:</strong>
                                    {nation[player["국적"]] && (
                                        <img
                                            src={`/FC_wahadak/assets/images/nation/${nation[player["국적"]]}`}
                                            alt={player["국적"]}
                                            className="nationality-image"
                                            style={{
                                                width: '40px',
                                                height: '30px',
                                                marginLeft: '5px',
                                                marginBottom: '3px'
                                            }}
                                        />
                                    )}
                                    {player["국적"]}{" "}
                                </p>
                                <p><strong>생년월일:</strong> {player["생년 월일"]}</p>
                                <p><strong>키:</strong> {player["키"]}cm - <strong>몸무게:</strong> {player["몸무게"]}kg</p>
                                <p><strong>체형:</strong> {player["체형"]}</p>
                                <p><strong>주발:</strong> {player["발"]}</p>
                            </div>
                            <div className="player-stats">
                                {player["포지션"] === "GK" ? (
                                    <div className="goalkeeper-stats">
                                        <div className={`stat ${getStatColorClass(player["다이빙"])}`}><strong>다이빙</strong><span>{player["다이빙"]}</span>
                                        </div>
                                        <div className={`stat ${getStatColorClass(player["골핸들링"])}`}>
                                            <strong>골핸들링</strong><span>{player["골핸들링"]}</span></div>
                                        <div className={`stat ${getStatColorClass(player["킥"])}`}>
                                            <strong>킥</strong><span>{player["킥"]}</span></div>
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

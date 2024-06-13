import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import apiClient from "../../../api/apiClient";

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
            const response = await apiClient.get("/search", {
                params: { pname, season, enhancementLevel }
            });

            if (response.status === 200) {
                setSearchResult(response.data);
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

    const getEnhancementImage = (level) => {
        return `${process.env.PUBLIC_URL}/assets/images/${level}.png`;
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
                    <Input
                        type="text"
                        name="season"
                        id="season"
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                    />
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
                        <div key={index} className="player-card">
                            <h3>{player.name}</h3>
                            <p>시즌: {player.season}</p>
                            <p>강화 단계: {player.enhancementLevel}</p>
                            <img
                                src={getEnhancementImage(player.enhancementLevel)}
                                alt={`Enhancement Level ${player.enhancementLevel}`}
                            />
                            {/* 다른 필요한 정보들 */}
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

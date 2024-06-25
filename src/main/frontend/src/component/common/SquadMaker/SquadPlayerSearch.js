import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import SeasonImageSelector from "../../common/SearchPlayer/SeasonImageSelector";
import "../../../../src/assets/scss/squadmaker/squadplayersearch.scss";

const SquadPlayerSearch = ({ position, onClose, onSearch }) => {
    const [pname, setPname] = useState("");
    const [season, setSeason] = useState("");
    const [enhancementLevel, setEnhancementLevel] = useState(1);
    const [spinner, setSpinner] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setSpinner(true);

        const searchParams = { pname, season, enhancementLevel };
        await onSearch(searchParams);
        setSpinner(false);
    };

    return (
        <div className="player-search">
            <div className="search-form-container">
                <div style={{marginBottom: "15px", fontSize:'2rem'}}>{position ? `${position} 선수 검색` : '선수 검색'}</div>
                <Form onSubmit={handleSearch}>
                    <FormGroup>
                        <div style={{width:'110%'}}>
                            <Label for="pname">선수 이름</Label>
                            <Input className="search-players" placeholder="선수 검색..." autoComplete="off"
                                   type="text"
                                   name="pname"
                                   id="pname"
                                   value={pname}
                                   onChange={(e) => setPname(e.target.value)}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup style={{marginLeft:'0.45rem', width:'105%'}}>
                        <Label for="season">시즌</Label>
                        <SeasonImageSelector selectedSeason={season} onSelect={setSeason} />
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
            </div>
        </div>
    );
};

export default SquadPlayerSearch;

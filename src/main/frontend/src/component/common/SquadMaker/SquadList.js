import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../assets/scss/squadmaker/squadlist.scss';

const SquadList = () => {
    const [squads, setSquads] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSquads = async () => {
            try {
                const response = await axios.get('/api/squad');
                setSquads(response.data);
            } catch (error) {
                console.error('Error fetching squads:', error);
            }
        };

        fetchSquads();
    }, []);

    const handleCreateSquad = () => {
        navigate(`${process.env.PUBLIC_URL}/squad-maker`);
    };

    const handleSquadClick = (squadId, squadData) => {
        navigate(`${process.env.PUBLIC_URL}/squad-maker/${squadId}`, { state: squadData });
    };

    return (
        <div className="squad-list">
            <h1>팀 목록</h1>
            {squads.length === 0 ? (
                <div className="no-squads">
                    <p>팀이 없습니다. 포메이션을 생성해보세요!</p>
                    <button onClick={handleCreateSquad}>나만의 포메이션 만들기</button>
                </div>
            ) : (
                <ul className="squad-items">
                    {squads.map(squad => (
                        <li key={squad.squadId} className="squad-item" onClick={() => handleSquadClick(squad.squadId, squad)}>
                            <div style={{fontSize:'2rem', fontWeight:'bold'}}>{squad.squadName}</div>
                            <div>유저: {squad.userNickname}</div>
                            <div>포메이션: {squad.formationName}</div>
                            <div>총 급여: {squad.formattedTotalPay}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SquadList;

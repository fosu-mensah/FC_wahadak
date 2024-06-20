import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../assets/scss/searchteamcolor/searchTeamColor.scss';

const SearchTeamColor = () => {
    const [teamColors, setTeamColors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTeamPlayers, setSelectedTeamPlayers] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentGroup, setCurrentGroup] = useState(1);
    const itemsPerPage = 20;
    const pagesPerGroup = 10;

    useEffect(() => {
        const fetchTeamColors = async () => {
            try {
                const response = await axios.get('/api/team-color');
                setTeamColors(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchTeamColors();
    }, []);

    const handleViewPlayers = (players) => {
        setSelectedTeamPlayers(players);
    };

    const formatEffect = (effect) => {
        return Object.entries(effect).map(([key, value]) => `${key.replace(/\s/g, '')} +${value}`).join(', ');
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextGroup = () => {
        setCurrentGroup(currentGroup + 1);
        setCurrentPage((currentGroup * pagesPerGroup) + 1);
    };

    const handlePrevGroup = () => {
        setCurrentGroup(currentGroup - 1);
        setCurrentPage(((currentGroup - 2) * pagesPerGroup) + 1);
    };

    const totalPages = Math.ceil(teamColors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = teamColors.slice(startIndex, startIndex + itemsPerPage);

    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="team-color-list">
            <div style={{fontSize: '3rem', textAlign: 'center', marginBottom: '2rem'}}>팀컬러 목록</div>
            <div className="page-info">
                * 한 페이지당 20개의 팀 컬러가 표시됩니다.
            </div>
            <ul className="team-color-items">
                {currentItems.map((teamColor) => (
                    <li key={teamColor.id} className="team-color-item">
                        <div style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem'
                        }}>{teamColor.teamColorName}</div>
                        <div>레벨: {teamColor.teamLevel}</div>
                        <div>효과: <strong>{formatEffect(teamColor.effect)}</strong></div>
                        <button onClick={() => handleViewPlayers(teamColor.players)}>선수 확인하기</button>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                <button onClick={handlePrevGroup} disabled={currentGroup === 1}>이전</button>
                {Array.from({length: endPage - startPage + 1}, (_, index) => (
                    <button
                        key={startPage + index}
                        onClick={() => handlePageChange(startPage + index)}
                        className={startPage + index === currentPage ? 'active' : ''}
                    >
                        {startPage + index}
                    </button>
                ))}
                <button onClick={handleNextGroup} disabled={endPage >= totalPages}>다음</button>
            </div>
            {selectedTeamPlayers && (
                <div className="player-list">
                    <h2>선수 목록</h2>
                    <ul>
                        {selectedTeamPlayers.map((player, index) => (
                            <li key={index}>{player}</li>
                        ))}
                    </ul>
                    <button onClick={() => setSelectedTeamPlayers(null)}>닫기</button>
                </div>
            )}
        </div>
    );
};

export default SearchTeamColor;

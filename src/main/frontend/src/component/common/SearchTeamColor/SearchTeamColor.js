import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import '../../../assets/scss/searchteamcolor/searchTeamColor.scss';
import './SearchTeamColor.scss'
import Breadcrumb from "../../common/breadcrumb/breadcrumb";

const SearchTeamColor = () => {
    const [teamColors, setTeamColors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTeamPlayers, setSelectedTeamPlayers] = useState(null);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
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

    const handleViewPlayers = (teamId, players) => {
        if (selectedTeamId === teamId) {
            setSelectedTeamPlayers(null);
            setSelectedTeamId(null);
        } else {
            setSelectedTeamPlayers(players);
            setSelectedTeamId(teamId);
        }
    };

    const formatEffect = (effect) => {
        return Object.entries(effect).map(([key, value]) => `${key.replace(/\s/g, '')} +${value}`).join(', ');
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setSelectedTeamPlayers(null); // 페이지 변경 시 선수 목록 초기화
        setSelectedTeamId(null); // 페이지 변경 시 선택된 팀 초기화
    };

    const handleNextGroup = () => {
        setCurrentGroup(currentGroup + 1);
        setCurrentPage((currentGroup * pagesPerGroup) + 1);
        setSelectedTeamPlayers(null); // 그룹 변경 시 선수 목록 초기화
        setSelectedTeamId(null); // 그룹 변경 시 선택된 팀 초기화
    };

    const handlePrevGroup = () => {
        setCurrentGroup(currentGroup - 1);
        setCurrentPage(((currentGroup - 2) * pagesPerGroup) + 1);
        setSelectedTeamPlayers(null); // 그룹 변경 시 선수 목록 초기화
        setSelectedTeamId(null); // 그룹 변경 시 선택된 팀 초기화
    };

    const totalPages = Math.ceil(teamColors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = teamColors.slice(startIndex, startIndex + itemsPerPage);

    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Fragment>
            <Breadcrumb parent="선수 검색" title="팀컬러 목록" />
        <div className="team-color-list">
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
                        <button className="view-players-button" onClick={() => handleViewPlayers(teamColor.id, teamColor.players)}>선수 확인하기</button>
                        {selectedTeamId === teamColor.id && selectedTeamPlayers && (
                            <div className="player-list">
                                <h2>선수 목록</h2>
                                <ul>
                                    {selectedTeamPlayers.map((player, index) => (
                                        <li key={index} className="player-item">{player}</li>
                                    ))}
                                </ul>
                                <button className="close-button" onClick={() => setSelectedTeamPlayers(null)}>닫기</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div className="pagination">
                <button onClick={handlePrevGroup} disabled={currentGroup === 1}>이전</button>
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
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
        </div>
        </Fragment>
    );
};

export default SearchTeamColor;

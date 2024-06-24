import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LeagueRanking.css';

const BASE_URL = 'http://localhost:8080/api';

const LeagueRanking = () => {
    const [rankings, setRankings] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState('프리미어리그');

    useEffect(() => {
        axios.get(`${BASE_URL}/league-rankings?leagueType=${selectedLeague}`)
            .then(response => {
                setRankings(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the league rankings!', error);
            });
    }, [selectedLeague]);

    return (
        <div className="league-ranking">
            <div className="fixed-title">🏅리그 순위</div>
            <div className="league-tabs fixed-tabs">
                {['프리미어리그', '라리가', '분데스리가', '세리에A', '리그1', '에레디비시'].map(league => (
                    <button
                        key={league}
                        className={selectedLeague === league ? 'active' : ''}
                        onClick={() => setSelectedLeague(league)}
                    >
                        {league}
                    </button>
                ))}
            </div>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>순위</th>
                        <th>팀명</th>
                        <th>경기수</th>
                        <th>승</th>
                        <th>무</th>
                        <th>패</th>
                        <th>득</th>
                        <th>실</th>
                        <th>득실</th>
                        <th>승점</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rankings.map(team => (
                        <tr key={team.id}>
                            <td>{team.rank}</td>
                            <td className="team-cell">
                                <div className="team-info">
                                    <img src={team.team_logo_url} alt={team.team_name} className="team-logo" />
                                    <span>{team.team_name}</span>
                                </div>
                            </td>
                            <td>{team.matches_played}</td>
                            <td>{team.wins}</td>
                            <td>{team.draws}</td>
                            <td>{team.losses}</td>
                            <td>{team.goals_for}</td>
                            <td>{team.goals_against}</td>
                            <td>{team.gain_or_loss}</td>
                            <td>{team.points}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeagueRanking;
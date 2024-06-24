import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../assets/scss/squadmaker/squadlist.scss';
import { getUserInfo } from '../../../services/authService'; // getUserInfo 함수 임포트
import Breadcrumb from "../../common/breadcrumb/breadcrumb";

const SquadList = () => {
    const [squads, setSquads] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo();
                setCurrentUser(userInfo);
            } catch (error) {
                console.error('Failed to load user info:', error);
                alert("로그인이 필요합니다.");
                navigate('/FC_wahadak/signin'); // 로그인 페이지로 리디렉션
            }
        };

        fetchUserInfo();
    }, [navigate]);

    useEffect(() => {
        const fetchSquads = async () => {
            try {
                const response = await axios.get('/api/squad');
                setSquads(response.data);
            } catch (error) {
                console.error('Error fetching squads:', error);
            }
        };

        if (currentUser) {
            fetchSquads();
        }
    }, [currentUser]);

    const handleCreateSquad = () => {
        navigate(`${process.env.PUBLIC_URL}/squad-maker`);
    };

    const handleSquadClick = (squadId, squadData) => {
        navigate(`${process.env.PUBLIC_URL}/squad-maker/${squadId}`, { state: squadData });
    };

    const filteredSquads = squads.filter(squad => squad.userNickname === currentUser?.nickname);

    return (
        <Fragment>
            <Breadcrumb parent="스쿼드 메이커" title="스쿼드 목록" />
            <div className="squad-list">
                <h1>팀 목록</h1>
                {filteredSquads.length === 0 ? (
                    <div className="no-squads">
                        <p>팀이 없습니다. 포메이션을 생성해보세요!</p>
                        <button onClick={handleCreateSquad}>나만의 포메이션 만들기</button>
                    </div>
                ) : (
                    <ul className="squad-items">
                        {filteredSquads.map(squad => (
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
        </Fragment>
    );
};

export default SquadList;

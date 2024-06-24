import React, { Fragment } from 'react';
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import './RefreshTimeList.css'; // CSS 파일 import

const players = [
    { name: 'ICON 굴리트', updateTime: '짝수 시간 4분', command: '/ICON굴리트' },
    { name: 'RTN 굴리트', updateTime: '짝수 시간 43분', command: '/RTN굴리트' },
    { name: 'UT 셰우첸코', updateTime: '홀수 시간 0분', command: '/UT셰우첸코' },
    { name: 'ICON 셰우첸코', updateTime: '짝수 시간 1분', command: '/ICON셰우첸코' },
    { name: 'UT 호날두', updateTime: '홀수 시간 30분', command: '/UT호날두' },
    { name: 'CC 호날두', updateTime: '짝수 시간 21분', command: '/CC호날두' },
    { name: '23TOTS 래시포드', updateTime: '짝수 시간 22분', command: '/23TOTS래시포드' },
    { name: 'EU24 멕토미니', updateTime: '홀수 시간 30분', command: '/EU24멕토미니' },
    { name: '21UCL 달로', updateTime: '홀수 시간 4분', command: '/21UCL달로' },
    { name: 'ICON 호나우두', updateTime: '짝수 시간 6분', command: '/ICON호나우두' },
];

const PlayerList = () => {
    const setAlarm = (command) => {
        const botUsername = 'heeggung_bot';
        const url = `https://t.me/${botUsername}?start=${encodeURIComponent(command)}`;
        window.open(url, '_blank');
    };

    return (
        <Fragment>
            <Breadcrumb parent="갱신 시간 목록" title="이적시장 선수 갱신 시간" />
            <div className="container">
                <div className="instructions">
                    갱신 시간 알람 받기를 원하는 선수에 해당하는 버튼을 클릭 후 연결되는 텔레그램 채팅방에서 <strong>/setalarm "선수명"</strong> 을 입력하면 알람 설정이 완료되고, <strong>/stopalarm "선수명"</strong> 을 입력하면 알람이 중지됩니다.!<br />
                    <strong>ex)</strong> RTN굴리트 알람 받기 : <strong>/setalarm RTN굴리트</strong><br />
                    <strong>ex)</strong> RTN굴리트 알람 해제 : <strong>/stopalarm RTN굴리트</strong><br />
                    📢추후 여러 선수들이 추가될 예정입니다.
                </div>
                <ul className="player-list">
                    {players.map((player) => (
                        <li className="player-list-item" key={player.command}>
                            <div>
                                <strong>{player.name}</strong> - {player.updateTime}
                            </div>
                            <button className="player-button" onClick={() => setAlarm(player.command)}>갱신 시간 알람 받기</button>
                        </li>
                    ))}
                </ul>
            </div>
        </Fragment>
    );
};

export default PlayerList;
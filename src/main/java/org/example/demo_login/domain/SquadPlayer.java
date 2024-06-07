package org.example.demo_login.domain;

import lombok.Data;

@Data
public class SquadPlayer {
    private int id;
    private int squadId; //squad 테이블 (기본키)
    private int playerId; // 선수 테이블 pid (기본키)
    private String position; // 선수 아이디가 들어가는 포지션
    private PlayerInfo playerInfo; // 선수의 정보를 포함하는 필드

}

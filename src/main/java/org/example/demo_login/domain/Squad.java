package org.example.demo_login.domain;

import lombok.Data;

import java.util.List;

@Data
public class Squad {
    private int squadId;
    private String userNickname;
    private int formationId;
    private String formationName; // 포메이션 테이블 조인
    private String squadName;
    private int totalPay;
    private String formattedTotalPay;
    private List<SquadPlayer> players; // 선수 목록 추가
    private List<String> positions; // 포지션 목록 추가
}

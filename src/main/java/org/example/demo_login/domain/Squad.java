package org.example.demo_login.domain;


import lombok.Data;

@Data
public class Squad {
    private int squadId;
    private String userNickname;
    private int formationId;
    private String formationName;// 포메이션 테이블 조인
    private String squadName;
    private int totalPay;
    private String formattedTotalPay;
}

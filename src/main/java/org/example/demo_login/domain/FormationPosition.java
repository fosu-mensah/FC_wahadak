package org.example.demo_login.domain;

import lombok.Data;

@Data
public class FormationPosition {
    private int id;
    private int formationId;
    private String position; // 포메이션 포지션 ex) 3-4-3에 CB
}

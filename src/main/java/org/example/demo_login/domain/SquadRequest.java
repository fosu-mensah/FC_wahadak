package org.example.demo_login.domain;


import lombok.Data;

@Data
public class SquadRequest {
    private String userNickname;
    private String squadName;
    private int formationId;
}

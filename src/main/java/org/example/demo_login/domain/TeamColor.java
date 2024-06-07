package org.example.demo_login.domain;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class TeamColor {
    private int id;
    private String teamColorName;
    private String teamLevel;
    private Map<String, Integer> effect; // effect를 Map으로 변경
    private List<String> players;
}

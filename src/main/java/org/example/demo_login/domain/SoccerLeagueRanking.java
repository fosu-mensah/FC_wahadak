package org.example.demo_login.domain;

import lombok.Data;

@Data
public class SoccerLeagueRanking {
    private int id;
    private int rank;
    private String league_type;
    private String team_name;
    private String team_logo_url;
    private int matches_played;
    private int wins;
    private int draws;
    private int losses;
    private int goals_for;
    private int goals_against;

    private int gain_or_loss;
    private int points;
}
package org.example.demo_login.controller;

import org.example.demo_login.domain.SoccerLeagueRanking;
import org.example.demo_login.service.SoccerLeagueRankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/league-rankings")
public class SoccerLeagueRankingController {

    private final SoccerLeagueRankingService service;

    @Autowired
    public SoccerLeagueRankingController(SoccerLeagueRankingService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<SoccerLeagueRanking>> getLeagueRankings(@RequestParam String leagueType) {
        List<SoccerLeagueRanking> rankings = service.getLeagueRankingsByType(leagueType);
        return ResponseEntity.ok(rankings);
    }
}
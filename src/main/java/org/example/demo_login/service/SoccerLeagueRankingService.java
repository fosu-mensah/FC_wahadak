package org.example.demo_login.service;

import org.example.demo_login.Mapper.SoccerLeagueRankingRepository;
import org.example.demo_login.domain.SoccerLeagueRanking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SoccerLeagueRankingService {
    private final SoccerLeagueRankingRepository repository;

    @Autowired
    public SoccerLeagueRankingService(SoccerLeagueRankingRepository repository) {
        this.repository = repository;
    }

    public List<SoccerLeagueRanking> getLeagueRankingsByType(String leagueType) {
        return repository.selectLeagueRankingsByType(leagueType);
    }
}
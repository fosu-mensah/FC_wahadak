package org.example.demo_login.service;

import org.example.demo_login.Mapper.TeamColorRepository;
import org.example.demo_login.domain.TeamColor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamColorService {

    @Autowired
    private TeamColorRepository teamColorRepository;

    public TeamColor getTeamColorById(int id) {
        return teamColorRepository.selectTeamColorById(id);
    }

    public List<TeamColor> getAllTeamColors() {
        return teamColorRepository.selectAllTeamColors();
    }
}

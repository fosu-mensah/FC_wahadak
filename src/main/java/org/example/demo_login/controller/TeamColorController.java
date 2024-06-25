package org.example.demo_login.controller;

import org.example.demo_login.domain.TeamColor;
import org.example.demo_login.service.TeamColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://www.fcwahadak.com"})
@RestController
@RequestMapping("/api/team-color")
public class TeamColorController {

    @Autowired
    private TeamColorService teamColorService;

    @GetMapping("/{id}")
    public ResponseEntity<TeamColor> getTeamColorById(@PathVariable int id) {
        TeamColor teamColor = teamColorService.getTeamColorById(id);
        if (teamColor != null) {
            return ResponseEntity.ok(teamColor);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<TeamColor>> getAllTeamColors() {
        List<TeamColor> teamColors = teamColorService.getAllTeamColors();
        return ResponseEntity.ok(teamColors);
    }
}

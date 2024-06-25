package org.example.demo_login.controller;

import org.example.demo_login.domain.Squad;
import org.example.demo_login.domain.SquadRequest;
import org.example.demo_login.service.SquadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin(origins = {"http://localhost:3000", "http://www.fcwahadak.com"})
@RestController
@RequestMapping("/api/squad")
public class SquadController {

    private static final Logger logger = LoggerFactory.getLogger(SquadController.class);

    @Autowired
    private SquadService squadService;

    @PostMapping("/create")
    public ResponseEntity<Squad> createSquad(@RequestBody SquadRequest squadRequest) {
        Squad squad = new Squad();
        squad.setUserNickname(squadRequest.getUserNickname());
        squad.setSquadName(squadRequest.getSquadName());
        squad.setFormationId(squadRequest.getFormationId());
        squadService.createSquad(squad);
        return ResponseEntity.ok(squad);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Squad> getSquadById(@PathVariable int id) {
        Squad squad = squadService.getSquadById(id);
        System.out.println(squad);
        if (squad == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(squad);
    }

    @GetMapping("/user/{userNickname}")
    public ResponseEntity<List<Squad>> getSquadsByUserName(@PathVariable String userNickname) {
        List<Squad> squads = squadService.getSquadsByUserName(userNickname);
        if (squads.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(squads);
    }

    @GetMapping
    public ResponseEntity<List<Squad>> getAllSquads() {
        logger.debug("Fetching all squads");
        List<Squad> squads = squadService.getAllSquads();
        return ResponseEntity.ok(squads);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateSquad(@PathVariable int id, @RequestBody Squad squad) {
        squad.setSquadId(id);
        squadService.updateSquad(squad);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSquad(@PathVariable int id) {
        logger.debug("Deleting squad by ID: {}", id);
        squadService.deleteSquad(id);
        return ResponseEntity.noContent().build();
    }
}

package org.example.demo_login.controller;

import org.example.demo_login.domain.SquadPlayer;
import org.example.demo_login.domain.PlayerRequest;
import org.example.demo_login.service.SquadPlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/squad/maker")
public class SquadPlayerController {

    @Autowired
    private SquadPlayerService squadPlayerService;

    @GetMapping("/{squadId}/players")
    public ResponseEntity<List<SquadPlayer>> getSquadPlayersBySquadId(@PathVariable int squadId) {
        List<SquadPlayer> squadPlayers = squadPlayerService.getSquadPlayersBySquadId(squadId);
        if (squadPlayers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(squadPlayers, HttpStatus.OK);
    }

    @PostMapping("/{squadId}/addPlayer")
    public ResponseEntity<Void> addSquadPlayer(@PathVariable int squadId, @RequestBody PlayerRequest playerRequest) {
        SquadPlayer squadPlayer = new SquadPlayer();
        squadPlayer.setSquadId(squadId);
        squadPlayer.setPlayerId(playerRequest.getPlayerId());
        squadPlayer.setPosition(playerRequest.getPosition());
        squadPlayerService.addSquadPlayer(squadPlayer);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{squadId}/players/{id}")
    public ResponseEntity<Void> removeSquadPlayer(@PathVariable int squadId, @PathVariable int id) {
        squadPlayerService.removeSquadPlayer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

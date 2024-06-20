package org.example.demo_login.controller;

import org.example.demo_login.domain.SquadPlayer;
import org.example.demo_login.domain.PlayerRequest;
import org.example.demo_login.service.SquadPlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
        System.out.println("Received PlayerRequest: " + playerRequest);

        SquadPlayer squadPlayer = new SquadPlayer();
        squadPlayer.setSquadId(squadId);
        squadPlayer.setPlayerId(playerRequest.getPlayerId());
        squadPlayer.setPosition(playerRequest.getPosition());
        squadPlayer.setPlayerInfo(playerRequest.getPlayerInfo());
        squadPlayerService.addSquadPlayer(squadPlayer);
        System.out.println(squadPlayer);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/{squadId}/save")
    public ResponseEntity<Void> saveSquad(@PathVariable int squadId, @RequestBody List<PlayerRequest> playerRequests) {
        List<SquadPlayer> squadPlayers = playerRequests.stream().map(playerRequest -> {
            SquadPlayer squadPlayer = new SquadPlayer();
            squadPlayer.setSquadId(squadId);
            squadPlayer.setPlayerId(playerRequest.getPlayerId());
            squadPlayer.setPosition(playerRequest.getPosition());
            squadPlayer.setPlayerInfo(playerRequest.getPlayerInfo());
            return squadPlayer;
        }).collect(Collectors.toList());

        squadPlayerService.saveSquad(squadId, squadPlayers);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("/{squadId}/players")
    public ResponseEntity<Void> removeAllSquadPlayers(@PathVariable int squadId) {
        squadPlayerService.removeAllSquadPlayers(squadId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

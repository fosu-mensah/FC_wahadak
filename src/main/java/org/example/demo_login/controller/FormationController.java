package org.example.demo_login.controller;

import org.example.demo_login.domain.Formation;
import org.example.demo_login.domain.FormationPosition;
import org.example.demo_login.service.FormationService;
import org.example.demo_login.service.FormationPositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://www.fcwahadak.com"})
@RestController
@RequestMapping("/formation")
public class FormationController {

    @Autowired
    private FormationService formationService;

    @Autowired
    private FormationPositionService formationPositionService;

    @GetMapping("/{id}")
    public Formation getFormationById(@PathVariable int id) {
        return formationService.getFormationById(id);
    }

    @GetMapping
    public ResponseEntity<List<Formation>> getAllFormations() {
        List<Formation> formations = formationService.getAllFormations();
        return ResponseEntity.ok(formations);
    }

    @GetMapping("/{id}/positions")
    public List<FormationPosition> getFormationPositionsByFormationId(@PathVariable int id) {
        return formationPositionService.getFormationPositionsByFormationId(id);
    }
}

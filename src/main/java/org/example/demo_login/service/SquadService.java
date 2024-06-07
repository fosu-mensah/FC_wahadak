package org.example.demo_login.service;

import org.example.demo_login.Mapper.SquadPlayerRepository;
import org.example.demo_login.domain.Squad;
import org.example.demo_login.domain.Formation;
import org.example.demo_login.Mapper.SquadRepository;
import org.example.demo_login.domain.SquadPlayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class SquadService {

    private static final Logger logger = LoggerFactory.getLogger(SquadService.class);

    @Autowired
    private SquadRepository squadRepository;

    @Autowired
    private FormationService formationService;

    @Autowired
    private SquadPlayerRepository squadPlayerRepository;

    public Squad getSquadById(int squadId) {
        calculateAndUpdateTotalPay(squadId);
        Squad squad = squadRepository.selectSquadById(squadId);
        if (squad != null) {
            formatTotalPay(squad);
        }
        return squad;
    }

    public List<Squad> getSquadsByUserName(String userNickname) {
        List<Squad> squads = squadRepository.selectSquadsByUserNickname(userNickname);
        for (Squad squad : squads) {
            calculateAndUpdateTotalPay(squad.getSquadId()); // 최신 급여 계산 및 업데이트
            formatTotalPay(squad);
        }
        return squads;
    }

    public List<Squad> getAllSquads() {
        List<Squad> squads = squadRepository.selectAllSquads();
        for (Squad squad : squads) {
            calculateAndUpdateTotalPay(squad.getSquadId()); // 최신 급여 계산 및 업데이트
            formatTotalPay(squad);
        }
        return squads;
    }

    public void createSquad(Squad squad) {
        logger.debug("Creating squad: {}", squad);
        Formation formation = formationService.getFormationById(squad.getFormationId());
        if (formation != null) {
            squad.setFormationName(formation.getFormationName());
        }
        squadRepository.insertSquad(squad);
    }

    public void updateSquad(Squad squad) {
        logger.debug("Updating squad: {}", squad);
        squadRepository.updateSquad(squad);
    }

    public void deleteSquad(int squadId) {
        logger.debug("Deleting squad by ID: {}", squadId);
        squadRepository.deleteSquad(squadId);
    }

    public void calculateAndUpdateTotalPay(int squadId) {
        List<SquadPlayer> squadPlayers = squadPlayerRepository.selectSquadPlayersBySquadId(squadId);
        int totalPay = squadPlayers.stream()
                .mapToInt(player -> {
                    String pay = player.getPlayerInfo().getPay();
                    if (pay == null || pay.isEmpty()) {
                        return 0;
                    }
                    try {
                        return Integer.parseInt(pay);
                    } catch (NumberFormatException e) {
                        return 0;
                    }
                })
                .sum();
        Squad squad = squadRepository.selectSquadById(squadId);
        squad.setTotalPay(totalPay);
        squadRepository.updateSquad(squad);
    }

    private void formatTotalPay(Squad squad) {
        squad.setFormattedTotalPay(String.format("%d/255", squad.getTotalPay()));
    }
}

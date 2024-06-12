package org.example.demo_login.service;

import org.example.demo_login.Mapper.PlayerStatsRepository;
import org.example.demo_login.Mapper.SquadPlayerRepository;
import org.example.demo_login.api.UserApiClient;
import org.example.demo_login.domain.PlayerStat;
import org.example.demo_login.domain.SquadPlayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SquadPlayerService {

    @Autowired
    private SquadPlayerRepository squadPlayerRepository;

    @Autowired
    private PlayerStatsRepository playerStatsRepository;

    @Autowired
    private UserApiClient userApiClient;

    @Autowired
    private SquadService squadService;

    public List<SquadPlayer> getSquadPlayersBySquadId(int squadId) {
        List<SquadPlayer> squadPlayers = squadPlayerRepository.selectSquadPlayersBySquadId(squadId);

        // 각 선수에 대해 이미지 URL을 설정하고 시즌 정보를 추가
        for (SquadPlayer squadPlayer : squadPlayers) {
            String playerId = String.valueOf(squadPlayer.getPlayerId());
            System.out.println(playerId);
            String imageUrl = userApiClient.getPlayerImageUrl(playerId);
            squadPlayer.getPlayerInfo().setImageUrl(imageUrl);

            // 시즌 정보 설정
            List<PlayerStat> playerStats = playerStatsRepository.findPlayerStatsByPid(squadPlayer.getPlayerId());
            if (!playerStats.isEmpty()) {
                squadPlayer.getPlayerInfo().setSeason(playerStats.get(0).getSeason());
                squadPlayer.getPlayerInfo().setSeasonUrl(playerStats.get(0).getSeasonUrl());
                squadPlayer.getPlayerInfo().setPay(playerStats.get(0).getPay());
                squadPlayer.getPlayerInfo().setPositionstat(playerStats.get(0).getPositionstat());
            }
            // 포지션에 따른 스탯 필터링
            squadPlayer.getPlayerInfo().filterStatsBasedOnPosition();
        }

        return squadPlayers;
    }

    public void addSquadPlayer(SquadPlayer squadPlayer) {
        squadPlayerRepository.insertSquadPlayer(squadPlayer);
        squadService.calculateAndUpdateTotalPay(squadPlayer.getSquadId());
    }

    //removeSquadPlayer 메서드에서 특정 선수를 삭제하려면 그
    // 선수의 id를 알아야 하기 때문에 selectSquadPlayerById 메서드를 사용
    public void removeSquadPlayer(int id) {
        SquadPlayer squadPlayer = squadPlayerRepository.selectSquadPlayerById(id);
        squadPlayerRepository.deleteSquadPlayer(id);
        squadService.calculateAndUpdateTotalPay(squadPlayer.getSquadId());
    }
}

package org.example.demo_login.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlayerDetails {
    @JsonProperty("선수 정보")
    private PlayerInfo playerInfo;

    @JsonProperty("선수 스탯")
    private List<PlayerStat> playerStats;

    public PlayerDetails(PlayerInfo playerInfo, List<PlayerStat> playerStats) {
        this.playerInfo = playerInfo;
        this.playerStats = playerStats;
        filterStatsBasedOnPosition();
    }

    private void filterStatsBasedOnPosition() {
        if ("GK".equals(playerInfo.getBestPosition())) {
            // 골키퍼일 경우 필드 플레이어 스탯을 null로 설정
            playerInfo.setAvgSpeed(null);
            playerInfo.setAvgShooting(null);
            playerInfo.setAvgPassing(null);
            playerInfo.setAvgDribble(null);
            playerInfo.setAvgDefence(null);
            playerInfo.setAvgPhysical(null);
            playerInfo.setFieldPlayerStats(null);
        } else {
            // 필드 플레이어일 경우 골키퍼 스탯을 null로 설정
            playerInfo.setGkDiving(null);
            playerInfo.setGkHandling(null);
            playerInfo.setGkKick(null);
            playerInfo.setGkReaction(null);
            playerInfo.setGkSpeed(null);
            playerInfo.setGkLocation(null);
            playerInfo.setGoalkeeperStats(null);
        }
    }
}

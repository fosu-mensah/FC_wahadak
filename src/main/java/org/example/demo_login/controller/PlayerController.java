package org.example.demo_login.controller;

import org.example.demo_login.api.UserApiClient;
import org.example.demo_login.domain.PlayerInfo;
import org.example.demo_login.domain.PlayerSearchRequest;
import org.example.demo_login.domain.PlayerStat;
import org.example.demo_login.domain.EnhancementRequest;
import org.example.demo_login.service.PlayerDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/players")
public class PlayerController {

    private final PlayerDetailsService playerDetailsService;

    private final UserApiClient userApiClient;

    public PlayerController(PlayerDetailsService playerDetailsService, UserApiClient userApiClient) {
        this.playerDetailsService = playerDetailsService;
        this.userApiClient = userApiClient;
    }

    // 선수 이름과 시즌, 강화 단계를 통한 검색 (GET 요청)
    @GetMapping("/search")
    public ResponseEntity<List<PlayerInfo>> searchPlayer(@RequestParam(value = "Pname", required = false) String pname,
                                                         @RequestParam(value = "season", required = false) String season,
                                                         @RequestParam(value = "sortOrder", defaultValue = "desc") String sortOrder,
                                                         @RequestParam(value = "enhancementLevel", defaultValue = "1") int enhancementLevel) {
        List<PlayerInfo> playerInfoList;
        if (pname != null && !pname.isEmpty() && season != null && !season.isEmpty()) {
            // 이름과 시즌으로 검색
            playerInfoList = playerDetailsService.getPlayerInfoByNameAndSeason(pname, season, sortOrder, enhancementLevel);
        } else if (pname != null && !pname.isEmpty()) {
            // 이름으로 검색
            playerInfoList = playerDetailsService.getPlayerInfoByName(pname, sortOrder, enhancementLevel);
        } else if (season != null && !season.isEmpty()) {
            // 시즌으로 검색
            playerInfoList = playerDetailsService.getPlayerInfoBySeason(season, sortOrder, enhancementLevel);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (playerInfoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(playerInfoList, HttpStatus.OK);
    }

    // 선수 이름과 시즌, 강화 단계를 통한 검색 (POST 요청)
    @PostMapping("/search")
    public ResponseEntity<List<PlayerInfo>> searchPlayerPost(@RequestBody PlayerSearchRequest request) {
        String pname = request.getPname();
        String season = request.getSeason();
        String sortOrder = request.getSortOrder() != null ? request.getSortOrder() : "desc";
        int enhancementLevel = request.getEnhancementLevel() != null ? request.getEnhancementLevel() : 1;

        List<PlayerInfo> playerInfoList;
        if (pname != null && !pname.isEmpty() && season != null && !season.isEmpty()) {
            // 이름과 시즌으로 검색
            playerInfoList = playerDetailsService.getPlayerInfoByNameAndSeason(pname, season, sortOrder, enhancementLevel);
        } else if (pname != null && !pname.isEmpty()) {
            // 이름으로 검색
            playerInfoList = playerDetailsService.getPlayerInfoByName(pname, sortOrder, enhancementLevel);
        } else if (season != null && !season.isEmpty()) {
            // 시즌으로 검색
            playerInfoList = playerDetailsService.getPlayerInfoBySeason(season, sortOrder, enhancementLevel);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (playerInfoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(playerInfoList, HttpStatus.OK);
    }

    // 강화 단계를 설정하는 POST 요청 처리
    @PostMapping("/enhance/{pid}")
    public ResponseEntity<List<PlayerStat>> enhancePlayerStats(@PathVariable int pid,
                                                               @RequestBody EnhancementRequest request) {
        int enhancementLevel = request.getEnhancementLevel();
        List<PlayerStat> enhancedStats = playerDetailsService.getPlayerStatsByPid(pid, enhancementLevel);
        if (enhancedStats.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(enhancedStats, HttpStatus.OK);
    }

    // 특정 선수의 스탯 조회 (GET 요청)
    @GetMapping("/stats/{pid}")
    public ResponseEntity<List<PlayerStat>> getPlayerStatsByPid(@PathVariable int pid,
                                                                @RequestParam(value = "enhancementLevel", defaultValue = "1") int enhancementLevel) {
        List<PlayerStat> playerStats = playerDetailsService.getPlayerStatsByPid(pid, enhancementLevel);
        if (playerStats.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(playerStats, HttpStatus.OK);
    }

    // 선수 이미지 조회 (GET 요청)
    @GetMapping("/image/{pid}")
    public ResponseEntity<byte[]> getPlayerImage(@PathVariable String pid) {
        byte[] image = userApiClient.getPlayerImage(pid);
        if (image != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            return new ResponseEntity<>(image, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 선수 비교 (GET 요청)
    // 선수 비교 (GET 요청)
    @GetMapping("/compare")
    public ResponseEntity<?> comparePlayers(@RequestParam String pname1, @RequestParam String season1,
                                            @RequestParam String pname2, @RequestParam String season2,
                                            @RequestParam(value = "enhancementLevel1", defaultValue = "1") int enhancementLevel1,
                                            @RequestParam(value = "enhancementLevel2", defaultValue = "1") int enhancementLevel2) {
        String decodedPname1 = URLDecoder.decode(pname1, StandardCharsets.UTF_8);
        String decodedSeason1 = URLDecoder.decode(season1, StandardCharsets.UTF_8);
        String decodedPname2 = URLDecoder.decode(pname2, StandardCharsets.UTF_8);
        String decodedSeason2 = URLDecoder.decode(season2, StandardCharsets.UTF_8);

        List<PlayerStat> comparisonResult = playerDetailsService.comparePlayerStats(decodedPname1, decodedSeason1, enhancementLevel1, decodedPname2, decodedSeason2, enhancementLevel2);
        if (comparisonResult == null) {
            return ResponseEntity.status(404).body("한 선수 혹은 두 선수의 데이터가 존재하지 않으므로 비교를 할 수 없습니다!");
        }
        return ResponseEntity.ok(comparisonResult);
    }

    // 특정 팀 컬러에 속한 선수들을 조회하는 엔드포인트
    @GetMapping("/team-color/{teamColorName}")
    public ResponseEntity<List<PlayerInfo>> getPlayersByTeamColor(@PathVariable String teamColorName) {
        List<PlayerInfo> playerInfoList = playerDetailsService.getPlayersByTeamColor(teamColorName);
        if(playerInfoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(playerInfoList,HttpStatus.OK);
    }
    // 특정 선수에게 팀 컬러 효과를 적용하는 엔드포인트
    @GetMapping("/{pid}/apply-team-color")
    public ResponseEntity<PlayerStat> applyTeamColorToPlayer(@PathVariable int pid,
                                                             @RequestParam String teamColorName,
                                                             @RequestParam(value = "enhancementLevel", defaultValue = "1") int enhancementLevel) {
        PlayerStat playerStat = playerDetailsService.applyTeamColorToPlayer(pid, teamColorName, enhancementLevel);
        if (playerStat == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(playerStat, HttpStatus.OK);
    }
}


package org.example.demo_login.service;

import org.example.demo_login.Mapper.PlayerInfoRepository;
import org.example.demo_login.Mapper.PlayerStatsRepository;
import org.example.demo_login.Mapper.TeamColorRepository;
import org.example.demo_login.api.UserApiClient;
import org.example.demo_login.domain.PlayerInfo;
import org.example.demo_login.domain.PlayerStat;
import org.example.demo_login.domain.TeamColor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.sql.SQLOutput;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;



@Service
public class PlayerDetailsService {

    private final PlayerInfoRepository playerInfoRepository;
    private final PlayerStatsRepository playerStatRepository;
    private final TeamColorRepository teamColorRepository;
    private final UserApiClient userApiClient;

    @Value("${api.request.delay:500}") //기본 지연 시간 0.5초
    private int requestDelay;

    @Autowired
    public PlayerDetailsService(PlayerInfoRepository playerInfoRepository, PlayerStatsRepository playerStatRepository, TeamColorRepository teamColorRepository, UserApiClient userApiClient) {
        this.playerInfoRepository = playerInfoRepository;
        this.playerStatRepository = playerStatRepository;
        this.teamColorRepository = teamColorRepository;
        this.userApiClient = userApiClient; //userApiClient 주입하고 초기화.
    }

    //실시간으로 메인 페이지에서 선수 이름을 검색하는 메서드
    // getPlayerInfoMainPage 메서드 수정
    public List<PlayerInfo> getPlayerInfoMainPage(String pname) {
        List<PlayerInfo> playerInfos = playerInfoRepository.findPlayerMainPage(pname);

        // 포지션 스탯을 내림차순으로 정렬
        playerInfos = playerInfos.stream()
                .sorted(Comparator.comparingInt((PlayerInfo info) ->
                                info.getPositionstat().values().stream().mapToInt(Integer::intValue).max().orElse(0))
                        .reversed())
                .collect(Collectors.toList());
        // 각 선수에 대해 이미지 URL을 설정하고 시즌 정보를 추가
        for (PlayerInfo info: playerInfos) {
            String playerId = String.valueOf(info.getPid());
            String imageUrl = fetchPlayerImageUrlWithRetry(playerId,3); //재시도 로직
            info.setImageUrl(imageUrl); // 이미지 URL 설정
            //지연 추가
            try{
                TimeUnit.MICROSECONDS.sleep(requestDelay);
            }catch (InterruptedException e){
                Thread.currentThread().interrupt();
                throw new RuntimeException(e);
            }
        }
        return playerInfos;
    }

    // 재시도 로직 추가
    private String fetchPlayerImageUrlWithRetry(String playerId, int maxRetries) {
        int attempt = 0;
        while (attempt < maxRetries) {
            try {
                return userApiClient.getPlayerImageUrl(playerId);
            } catch (HttpClientErrorException.Forbidden e) {
                attempt++;
                if (attempt >= maxRetries) {
                    throw e;
                }
                try {
                    TimeUnit.SECONDS.sleep((long) Math.pow(2, attempt)); // 지수 백오프
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException(ie);
                }
            }
        }
        return null; // 이 경우는 실제로 발생하지 않을 것입니다.
    }



    //선수 이름으로 검색하는 메소드
    public List<PlayerInfo> getPlayerInfoByName(String pname, String sortOrder, int enhancementLevel) {
        List<PlayerInfo> playerInfos = playerInfoRepository.findPlayerInfoByName(pname);
        if (playerInfos.isEmpty()) {
            return List.of();
        }

        for (PlayerInfo info: playerInfos) {
            String playerId = String.valueOf(info.getPid());
            String imageUrl = userApiClient.getPlayerImageUrl(playerId);
            info.setImageUrl(imageUrl); // 이미지 URL 설정
            info.filterStatsBasedOnPosition(); // 포지션에 따라 스탯 필터링
            // 팀 컬러 이름 설정
            List<String> teamColorNames = teamColorRepository.selectAllTeamColors().stream()
                    .filter(tc -> tc.getPlayers().contains(info.getPname()))
                    .map(TeamColor::getTeamColorName)
                    .collect(Collectors.toList());
            info.setTeamColorNames(teamColorNames);
        }
        return enhanceAndSortPlayerInfos(playerInfos, sortOrder, enhancementLevel);
    }
    //시즌으로 검색하는 메소드
    public List<PlayerInfo> getPlayerInfoBySeason(String season, String sortOrder, int enhancementLevel) {
        List<PlayerStat> playerStats = playerStatRepository.findPlayerStatsBySeason(season);
        if (playerStats.isEmpty()) {
            return List.of();
        }

        List<CompletableFuture<PlayerInfo>> futures = playerStats.stream()
                .map(stat -> CompletableFuture.supplyAsync(() -> {
                    PlayerInfo info = playerInfoRepository.findPlayerInfoByPid(stat.getPid());
                    if (info != null) {
                        info = updatePlayerInfoWithStat(info, stat, enhancementLevel);
                        // 이미지 URL 설정
                        String playerId = String.valueOf(info.getPid());
                        String imageUrl = fetchPlayerImageUrlWithRetry(playerId, 3); // 재시도 로직
                        info.setImageUrl(imageUrl);
                    }
                    return info;
                }))
                .collect(Collectors.toList());

        // Collect the results of all futures
        List<PlayerInfo> playerInfos = futures.stream()
                .map(future -> {
                    try {
                        return future.get();
                    } catch (InterruptedException | ExecutionException e) {
                        throw new RuntimeException(e);
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        return enhanceAndSortPlayerInfos(playerInfos, sortOrder, enhancementLevel);
    }

    //선수 이름과 시즌으로 검색하는 메소드
    public List<PlayerInfo> getPlayerInfoByNameAndSeason(String pname, String season, String sortOrder, int enhancementLevel) {
        System.out.println("getPlayerInfoByNameAndSeason called with parameters: pname=" + pname + ", season=" + season + ", sortOrder=" + sortOrder + ", enhancementLevel=" + enhancementLevel);
        List<PlayerStat> playerStats = playerStatRepository.findPlayerStatsByNameAndSeason(pname, season);
        List<PlayerInfo> playerInfos = playerStats.stream()
                .map(stat -> {
                    PlayerInfo info = playerInfoRepository.findPlayerInfoByPid(stat.getPid());
                    if (info != null) {
                        if (info.getPositionstat() == null) {
                            info.setPositionstat(new HashMap<>());
                        }
                        setImageUrlForPlayerInfo(info); // 이미지 URL 설정
                    }
                    return info;
                })
                .collect(Collectors.toList());
        return enhanceAndSortPlayerInfos(playerInfos, sortOrder, enhancementLevel);
    }
    private void setImageUrlForPlayerInfo(PlayerInfo info) {
        if (info != null) {
            String playerId = String.valueOf(info.getPid());
            String imageUrl = userApiClient.getPlayerImageUrl(playerId);
            info.setImageUrl(imageUrl);
        }
    }

    private PlayerInfo updatePlayerInfoWithStat(PlayerInfo info, PlayerStat stat, int enhancementLevel) {
        if (info != null) {
            PlayerStat enhancedStat = stat.applyEnhancement(enhancementLevel);
            info.setSeason(enhancedStat.getSeason());
            info.setSeasonUrl(enhancedStat.getSeasonUrl());
            info.setPositionstat(enhancedStat.getPositionstat());
            info.setPay(enhancedStat.getPay());
            info.setNation(enhancedStat.getNation());
            info.setBestPosition(enhancedStat.getBestPosition());
            info.setBirth(enhancedStat.getBirth());
            info.setHeight(enhancedStat.getHeight());
            info.setWeight(enhancedStat.getWeight());
            info.setBody(enhancedStat.getBody());
            info.setSkill(enhancedStat.getSkill());
            info.setFoot(enhancedStat.getFoot());
            info.setFamous(enhancedStat.getFamous());
            info.setCareer(enhancedStat.getCareer());
            info.setTraits(enhancedStat.getTraits());
            info.setAvgSpeed(enhancedStat.getAvgSpeed());
            info.setAvgShooting(enhancedStat.getAvgShooting());
            info.setAvgPassing(enhancedStat.getAvgPassing());
            info.setAvgDribble(enhancedStat.getAvgDribble());
            info.setAvgDefence(enhancedStat.getAvgDefence());
            info.setAvgPhysical(enhancedStat.getAvgPhysical());
            info.setGkDiving(enhancedStat.getGkDiving());
            info.setGkHandling(enhancedStat.getGkHandling());
            info.setGkKick(enhancedStat.getGkKick());
            info.setGkReaction(enhancedStat.getGkReaction());
            info.setGkSpeed(enhancedStat.getGkSpeed());
            info.setGkLocation(enhancedStat.getGkLocation());
            info.setImageUrl("/players/image/" + enhancedStat.getPid()); // 이미지 URL 설정
            info.filterStatsBasedOnPosition();

            List<String> teamColorNames = teamColorRepository.selectAllTeamColors().stream()
                    .filter(tc -> tc.getPlayers().contains(info.getPname()))
                    .map(TeamColor::getTeamColorName)
                    .collect(Collectors.toList());
            info.setTeamColorNames(teamColorNames);
        }
        return info;
    }

    private List<PlayerInfo> enhanceAndSortPlayerInfos(List<PlayerInfo> playerInfos, String sortOrder, int enhancementLevel) {
        List<PlayerInfo> sortedPlayerInfos = playerInfos.stream()
                .map(info -> {
                    List<PlayerStat> stats = playerStatRepository.findPlayerStatsByPid(info.getPid());
                    if (!stats.isEmpty()) {
                        PlayerStat stat = stats.get(0).applyEnhancement(enhancementLevel);
                        info.setSeason(stat.getSeason());
                        info.setSeasonUrl(stat.getSeasonUrl());
                        info.setPositionstat(stat.getPositionstat() != null ? stat.getPositionstat() : new HashMap<>()); // null 체크 후 빈 맵 설정
                        info.setPay(stat.getPay());
                    }
                    return info;
                })
                .sorted((info1, info2) -> {
                    int stat1 = info1.getPositionstat().values().stream().mapToInt(Integer::intValue).max().orElse(0);
                    int stat2 = info2.getPositionstat().values().stream().mapToInt(Integer::intValue).max().orElse(0);
                    return "desc".equalsIgnoreCase(sortOrder) ? Integer.compare(stat2, stat1) : Integer.compare(stat1, stat2);
                })
                .collect(Collectors.toList());

        return sortedPlayerInfos;
    }

    // 선수 스탯을 보여주는 메서드
    public List<PlayerStat> getPlayerStatsByPid(int pid, int enhancementLevel) {
        List<PlayerStat> playerStats = playerStatRepository.findPlayerStatsByPid(pid);
        playerStats.forEach(stat -> {
            String playerId = String.valueOf(stat.getPid());
            String imageUrl = fetchPlayerImageUrlWithRetry(playerId,3); //재시도 로직
            System.out.println(playerId);
            System.out.println(imageUrl);
            stat.setImageUrl(imageUrl);
            PlayerInfo info = playerInfoRepository.findPlayerInfoByPid(stat.getPid());
            if (info != null) {
                stat.setNation(info.getNation());

                stat.setBestPosition(info.getBestPosition());
                stat.setBirth(info.getBirth());
                stat.setHeight(info.getHeight());
                stat.setWeight(info.getWeight());
                stat.setBody(info.getBody());
                stat.setSkill(info.getSkill());
                stat.setFoot(info.getFoot());
                stat.setFamous(info.getFamous());
                stat.setTraits(info.getTraits());
                stat.setAvgSpeed(info.getAvgSpeed());
                stat.setAvgShooting(info.getAvgShooting());
                stat.setAvgPassing(info.getAvgPassing());
                stat.setAvgDribble(info.getAvgDribble());
                stat.setAvgDefence(info.getAvgDefence());
                stat.setAvgPhysical(info.getAvgPhysical());
                stat.setGkDiving(info.getGkDiving());
                stat.setGkHandling(info.getGkHandling());
                stat.setGkKick(info.getGkKick());
                stat.setGkReaction(info.getGkReaction());
                stat.setGkSpeed(info.getGkSpeed());
                stat.setGkLocation(info.getGkLocation());
                stat.setCareer(info.getCareer());
                stat.filterStatsBasedOnPosition();

                List<String> teamColorNames = teamColorRepository.selectAllTeamColors().stream()
                        .filter(tc -> tc.getPlayers().contains(info.getPname()))
                        .map(TeamColor::getTeamColorName)
                        .collect(Collectors.toList());
                stat.setTeamColorNames(teamColorNames);
            }
        });

        return playerStats.stream()
                .map(stat -> stat.applyEnhancement(enhancementLevel))
                .collect(Collectors.toList());
    }

    public PlayerStat getPlayerStatByNameAndSeason(String pname, String season, int enhancementLevel) {
        List<PlayerStat> playerStats = playerStatRepository.findPlayerStatsByNameAndSeason(pname, season);
        if (playerStats.isEmpty()) {
            System.out.println("No data found for player: " + pname + " in season: " + season);
            return null;
        }

        PlayerStat playerStat = playerStats.get(0);
        PlayerInfo info = playerInfoRepository.findPlayerInfoByPid(playerStat.getPid());
        if (info != null) {
            String imageUrl = "/players/image/" + playerStat.getPid();
            playerStat.setImageUrl(imageUrl);
            playerStat.setNation(info.getNation());
            playerStat.setBestPosition(info.getBestPosition());
            info.setPositionstat(playerStats.get(0).getPositionstat());
            playerStat.setBirth(info.getBirth());
            playerStat.setHeight(info.getHeight());
            playerStat.setWeight(info.getWeight());
            playerStat.setBody(info.getBody());
            playerStat.setSkill(info.getSkill());
            playerStat.setFoot(info.getFoot());
            playerStat.setFamous(info.getFamous());
            playerStat.setCareer(info.getCareer());
            playerStat.setTraits(info.getTraits());
            playerStat.setAvgSpeed(info.getAvgSpeed());
            playerStat.setAvgShooting(info.getAvgShooting());
            playerStat.setAvgPassing(info.getAvgPassing());
            playerStat.setAvgDribble(info.getAvgDribble());
            playerStat.setAvgDefence(info.getAvgDefence());
            playerStat.setAvgPhysical(info.getAvgPhysical());
            playerStat.setGkDiving(info.getGkDiving());
            playerStat.setGkHandling(info.getGkHandling());
            playerStat.setKick(info.getGkKick());
            playerStat.setGkReaction(info.getGkReaction());
            playerStat.setGkSpeed(info.getGkSpeed());
            playerStat.setGkLocation(info.getGkLocation());
            playerStat.filterStatsBasedOnPosition();

            List<String> teamColorNames = teamColorRepository.selectAllTeamColors().stream()
                    .filter(tc -> tc.getPlayers().contains(info.getPname()))
                    .map(TeamColor::getTeamColorName)
                    .collect(Collectors.toList());
            playerStat.setTeamColorNames(teamColorNames);
        }
        return playerStat.applyEnhancement(enhancementLevel);
    }

    public List<PlayerStat> comparePlayerStats(String pname1, String season1, int enhancementLevel1,
                                               String pname2, String season2, int enhancementLevel2) {
        PlayerStat playerStat1 = getPlayerStatByNameAndSeason(pname1, season1, enhancementLevel1);
        PlayerStat playerStat2 = getPlayerStatByNameAndSeason(pname2, season2, enhancementLevel2);

        if (playerStat1 == null || playerStat2 == null) {
            return null;
        }

        playerStat1.filterStatsBasedOnPosition();
        playerStat2.filterStatsBasedOnPosition();

        return List.of(playerStat1, playerStat2);
    }

    public List<PlayerInfo> getPlayersByTeamColor(String teamColorName) {
        TeamColor teamColor = teamColorRepository.findByName(teamColorName);
        if (teamColor == null || teamColor.getPlayers() == null) {
            return List.of();
        }
        List<String> playerNames = teamColor.getPlayers();
        List<PlayerInfo> playerInfos = playerInfoRepository.findPlayerInfoByNames(playerNames);

        return playerInfos.stream()
                .map(info -> {
                    List<PlayerStat> stats = playerStatRepository.findPlayerStatsByPid(info.getPid());
                    if (!stats.isEmpty()) {
                        PlayerStat stat = stats.get(0);
                        info.setSeason(stat.getSeason());
                        info.setSeasonUrl(stat.getSeasonUrl());
                        info.setPositionstat(stat.getPositionstat());
                        info.setPay(stat.getPay());
                        info.filterStatsBasedOnPosition();

                        // 팀 컬러 이름 설정
                        List<String> teamColorNames = teamColorRepository.selectAllTeamColors().stream()
                                .filter(tc -> tc.getPlayers().contains(info.getPname()))
                                .map(TeamColor::getTeamColorName)
                                .collect(Collectors.toList());
                        info.setTeamColorNames(teamColorNames);
                    }
                    return info;
                })
                .sorted(Comparator.comparingInt((PlayerInfo info) -> info.getPositionstat().values().stream().mapToInt(Integer::intValue).max().orElse(0)).reversed())
                .collect(Collectors.toList());
    }
    public PlayerStat applyTeamColorToPlayer(int pid, String teamColorName, int enhancementLevel) {
        TeamColor teamColor = teamColorRepository.findByName(teamColorName);
        if (teamColor == null || teamColor.getEffect() == null) {
            return null;
        }

        List<PlayerStat> stats = playerStatRepository.findPlayerStatsByPid(pid);
        if (stats.isEmpty()) {
            return null;
        }

        PlayerStat playerStat = stats.get(0);
        Map<String, Integer> effect = teamColor.getEffect();

        // Apply team color effect to player stats
        PlayerStat finalPlayerStat = playerStat;
        effect.forEach((stat, increase) -> {
            switch (stat) {
                case "속력":
                    finalPlayerStat.setSpeed(increaseStat(finalPlayerStat.getSpeed(), increase));
                    break;
                case "가속력":
                    finalPlayerStat.setAccr(increaseStat(finalPlayerStat.getAccr(), increase));
                    break;
                case "슛 파워":
                    finalPlayerStat.setShotpower(increaseStat(finalPlayerStat.getShotpower(), increase));
                    break;
                case "골 결정력":
                    finalPlayerStat.setFinish(increaseStat(finalPlayerStat.getFinish(), increase));
                    break;
                case "중거리슛":
                    finalPlayerStat.setLongshot(increaseStat(finalPlayerStat.getLongshot(), increase));
                    break;
                case "위치선정":
                    finalPlayerStat.setPositioning(increaseStat(finalPlayerStat.getPositioning(), increase));
                    break;
                case "발리슛":
                    finalPlayerStat.setVolley(increaseStat(finalPlayerStat.getVolley(), increase));
                    break;
                case "페널티킥":
                    finalPlayerStat.setPenalty(increaseStat(finalPlayerStat.getPenalty(), increase));
                    break;
                case "짧은 패스":
                    finalPlayerStat.setShortpass(increaseStat(finalPlayerStat.getShortpass(), increase));
                    break;
                case "시야":
                    finalPlayerStat.setVision(increaseStat(finalPlayerStat.getVision(), increase));
                    break;
                case "크로스":
                    finalPlayerStat.setCross(increaseStat(finalPlayerStat.getCross(), increase));
                    break;
                case "긴 패스":
                    finalPlayerStat.setLongpass(increaseStat(finalPlayerStat.getLongpass(), increase));
                    break;
                case "프리킥":
                    finalPlayerStat.setFreekick(increaseStat(finalPlayerStat.getFreekick(), increase));
                    break;
                case "커브":
                    finalPlayerStat.setCurve(increaseStat(finalPlayerStat.getCurve(), increase));
                    break;
                case "드리블":
                    finalPlayerStat.setDribbling(increaseStat(finalPlayerStat.getDribbling(), increase));
                    break;
                case "볼 컨트롤":
                    finalPlayerStat.setBallcontroll(increaseStat(finalPlayerStat.getBallcontroll(), increase));
                    break;
                case "민첩성":
                    finalPlayerStat.setAgility(increaseStat(finalPlayerStat.getAgility(), increase));
                    break;
                case "밸런스":
                    finalPlayerStat.setBalance(increaseStat(finalPlayerStat.getBalance(), increase));
                    break;
                case "반응속도":
                    finalPlayerStat.setReaction(increaseStat(finalPlayerStat.getReaction(), increase));
                    break;
                case "대인 수비":
                    finalPlayerStat.setDefending(increaseStat(finalPlayerStat.getDefending(), increase));
                    break;
                case "태클":
                    finalPlayerStat.setTackling(increaseStat(finalPlayerStat.getTackling(), increase));
                    break;
                case "가로채기":
                    finalPlayerStat.setIntercept(increaseStat(finalPlayerStat.getIntercept(), increase));
                    break;
                case "헤더":
                    finalPlayerStat.setHeader(increaseStat(finalPlayerStat.getHeader(), increase));
                    break;
                case "슬라이딩 태클":
                    finalPlayerStat.setSlidingtackle(increaseStat(finalPlayerStat.getSlidingtackle(), increase));
                    break;
                case "몸싸움":
                    finalPlayerStat.setStrength(increaseStat(finalPlayerStat.getStrength(), increase));
                    break;
                case "스태미너":
                    finalPlayerStat.setStamina(increaseStat(finalPlayerStat.getStamina(), increase));
                    break;
                case "적극성":
                    finalPlayerStat.setAggression(increaseStat(finalPlayerStat.getAggression(), increase));
                    break;
                case "점프":
                    finalPlayerStat.setJump(increaseStat(finalPlayerStat.getJump(), increase));
                    break;
                case "침착성":
                    finalPlayerStat.setComposure(increaseStat(finalPlayerStat.getComposure(), increase));
                    break;
                case "다이빙":
                    finalPlayerStat.setDiving(increaseStat(finalPlayerStat.getDiving(), increase));
                    break;
                case "핸들링":
                    finalPlayerStat.setHandling(increaseStat(finalPlayerStat.getHandling(), increase));
                    break;
                case "킥":
                    finalPlayerStat.setKick(increaseStat(finalPlayerStat.getKick(), increase));
                    break;
                case "반사신경":
                    finalPlayerStat.setReflexes(increaseStat(finalPlayerStat.getReflexes(), increase));
                    break;
                case "GK 위치선정":
                    finalPlayerStat.setGkposition(increaseStat(finalPlayerStat.getGkposition(), increase));
                    break;
                default:
                    break;
            }
        });

        // Apply enhancement after team color effects
        playerStat = playerStat.applyEnhancement(enhancementLevel);

        return playerStat;
    }

    private Integer increaseStat(Integer originalStat, int increase) {
        return originalStat != null ? originalStat + increase : increase;
    }
}
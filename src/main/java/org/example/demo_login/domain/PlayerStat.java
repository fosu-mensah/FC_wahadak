package org.example.demo_login.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlayerStat {

    @JsonIgnore
    private int pid;

    @JsonProperty("선수이름")
    private String pname;

    @JsonProperty("이미지 URL")
    private String imageUrl; // 이미지 URL 필드 추가

    @JsonProperty("시즌")
    private String season;

    @JsonProperty("시즌 URL")
    private String seasonUrl;

    @JsonProperty("국적")
    private String nation;

    @JsonProperty("포지션")
    private String bestPosition;

    @JsonProperty("포지션 스탯")
    private Map<String, Integer> positionstat;

    @JsonProperty("급여")
    private String pay;

    // PlayerInfo의 필드들 추가
    @JsonProperty("생년 월일")
    private String birth;

    @JsonProperty("키")
    private int height;

    @JsonProperty("몸무게")
    private int weight;

    @JsonProperty("체형")
    private String body;

    @JsonProperty("개인기")
    private int skill;

    @JsonProperty("발")
    private String foot;

    @JsonProperty("유명도")
    private String famous;

    @JsonProperty("1카 평균 거래 BP")
    private String BP1;

    @JsonProperty("클럽 경력")
    private List<PlayerInfo.Career> career;

    @JsonProperty("특성")
    private String traits;

    @JsonProperty("Speed")
    private Integer avgSpeed;

    @JsonProperty("Shot")
    private Integer avgShooting;

    @JsonProperty("Pass")
    private Integer avgPassing;

    @JsonProperty("Dribble")
    private Integer avgDribble;

    @JsonProperty("Defense")
    private Integer avgDefence;

    @JsonProperty("Pysicial")
    private Integer avgPhysical;

    @JsonProperty("Diving")
    private Integer gkDiving;

    @JsonProperty("Handling")
    private Integer gkHandling;

    @JsonProperty("Kick")
    private Integer gkKick;

    @JsonProperty("Reactions")
    private Integer gkReaction;

    @JsonProperty("GK Speed")
    private Integer gkSpeed;

    @JsonProperty("GK Position")
    private Integer gkLocation;

    @JsonProperty("속력")
    private Integer speed;

    @JsonProperty("가속력")
    private Integer accr;

    @JsonProperty("골 결정력")
    private Integer finish;

    @JsonProperty("슛 파워")
    private Integer shotpower;

    @JsonProperty("중거리슛")
    private Integer longshot;

    @JsonProperty("위치선정")
    private Integer positioning;

    @JsonProperty("발리슛")
    private Integer volley;

    @JsonProperty("페널티킥")
    private Integer penalty;

    @JsonProperty("짧은 패스")
    private Integer shortpass;

    @JsonProperty("시야")
    private Integer vision;

    @JsonProperty("크로스")
    private Integer cross;

    @JsonProperty("긴 패스")
    private Integer longpass;

    @JsonProperty("프리킥")
    private Integer freekick;

    @JsonProperty("커브")
    private Integer curve;

    @JsonProperty("드리블")
    private Integer dribbling;

    @JsonProperty("볼 컨트롤")
    private Integer ballcontroll;

    @JsonProperty("민첩성")
    private Integer agility;

    @JsonProperty("밸런스")
    private Integer balance;

    @JsonProperty("반응속도")
    private Integer reaction;

    @JsonProperty("대인 수비")
    private Integer defending;

    @JsonProperty("태클")
    private Integer tackling;

    @JsonProperty("가로채기")
    private Integer intercept;

    @JsonProperty("헤더")
    private Integer header;

    @JsonProperty("슬라이딩 태클")
    private Integer slidingtackle;

    @JsonProperty("몸싸움")
    private Integer strength;

    @JsonProperty("스태미너")
    private Integer stamina;

    @JsonProperty("적극성")
    private Integer aggression;

    @JsonProperty("점프")
    private Integer jump;

    @JsonProperty("침착성")
    private Integer composure;

    @JsonProperty("GK 다이빙")
    private Integer diving;

    @JsonProperty("GK 핸들링")
    private Integer handling;

    @JsonProperty("GK 킥")
    private Integer Kick;

    @JsonProperty("GK 반사신경")
    private Integer reflexes;

    @JsonProperty("GK 위치선정")
    private Integer gkposition;

    @JsonProperty("팀 컬러")
    private List<String> teamColorNames;


    @JsonIgnore
    private String positionstatJson;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Integer> fieldPlayerStats;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Integer> goalkeeperStats;

    public PlayerStat applyEnhancement(int enhancementLevel) {
        PlayerStat enhancedStat = new PlayerStat();
        enhancedStat.setPid(this.pid);
        enhancedStat.setPname(this.pname);
        enhancedStat.setImageUrl(this.imageUrl);
        enhancedStat.setSeason(this.season);
        enhancedStat.setSeasonUrl(this.seasonUrl);
        enhancedStat.setNation(this.nation);
        enhancedStat.setBestPosition(this.bestPosition);
        enhancedStat.setPay(this.pay);
        enhancedStat.setBirth(this.birth);
        enhancedStat.setHeight(this.height);
        enhancedStat.setWeight(this.weight);
        enhancedStat.setBody(this.body);
        enhancedStat.setSkill(this.skill);
        enhancedStat.setFoot(this.foot);
        enhancedStat.setFamous(this.famous);
        enhancedStat.setBP1(this.BP1);
        enhancedStat.setCareer(this.career);
        enhancedStat.setTraits(this.traits);
        enhancedStat.setAvgSpeed(increaseStat(this.avgSpeed, enhancementLevel));
        enhancedStat.setAvgShooting(increaseStat(this.avgShooting, enhancementLevel));
        enhancedStat.setAvgPassing(increaseStat(this.avgPassing, enhancementLevel));
        enhancedStat.setAvgDribble(increaseStat(this.avgDribble, enhancementLevel));
        enhancedStat.setAvgDefence(increaseStat(this.avgDefence, enhancementLevel));
        enhancedStat.setAvgPhysical(increaseStat(this.avgPhysical, enhancementLevel));
        enhancedStat.setGkDiving(increaseStat(this.gkDiving, enhancementLevel));
        enhancedStat.setGkHandling(increaseStat(this.gkHandling, enhancementLevel));
        enhancedStat.setGkKick(increaseStat(this.gkKick, enhancementLevel));
        enhancedStat.setGkReaction(increaseStat(this.gkReaction, enhancementLevel));
        enhancedStat.setGkSpeed(increaseStat(this.gkSpeed, enhancementLevel));
        enhancedStat.setGkLocation(increaseStat(this.gkLocation, enhancementLevel));
        enhancedStat.setSpeed(increaseStat(this.speed, enhancementLevel));
        enhancedStat.setAccr(increaseStat(this.accr, enhancementLevel));
        enhancedStat.setFinish(increaseStat(this.finish, enhancementLevel));
        enhancedStat.setShotpower(increaseStat(this.shotpower, enhancementLevel));
        enhancedStat.setLongshot(increaseStat(this.longshot, enhancementLevel));
        enhancedStat.setPositioning(increaseStat(this.positioning, enhancementLevel));
        enhancedStat.setVolley(increaseStat(this.volley, enhancementLevel));
        enhancedStat.setPenalty(increaseStat(this.penalty, enhancementLevel));
        enhancedStat.setShortpass(increaseStat(this.shortpass, enhancementLevel));
        enhancedStat.setVision(increaseStat(this.vision, enhancementLevel));
        enhancedStat.setCross(increaseStat(this.cross, enhancementLevel));
        enhancedStat.setLongpass(increaseStat(this.longpass, enhancementLevel));
        enhancedStat.setFreekick(increaseStat(this.freekick, enhancementLevel));
        enhancedStat.setCurve(increaseStat(this.curve, enhancementLevel));
        enhancedStat.setDribbling(increaseStat(this.dribbling, enhancementLevel));
        enhancedStat.setBallcontroll(increaseStat(this.ballcontroll, enhancementLevel));
        enhancedStat.setAgility(increaseStat(this.agility, enhancementLevel));
        enhancedStat.setBalance(increaseStat(this.balance, enhancementLevel));
        enhancedStat.setReaction(increaseStat(this.reaction, enhancementLevel));
        enhancedStat.setDefending(increaseStat(this.defending, enhancementLevel));
        enhancedStat.setTackling(increaseStat(this.tackling, enhancementLevel));
        enhancedStat.setIntercept(increaseStat(this.intercept, enhancementLevel));
        enhancedStat.setHeader(increaseStat(this.header, enhancementLevel));
        enhancedStat.setSlidingtackle(increaseStat(this.slidingtackle, enhancementLevel));
        enhancedStat.setStrength(increaseStat(this.strength, enhancementLevel));
        enhancedStat.setStamina(increaseStat(this.stamina, enhancementLevel));
        enhancedStat.setAggression(increaseStat(this.aggression, enhancementLevel));
        enhancedStat.setJump(increaseStat(this.jump, enhancementLevel));
        enhancedStat.setComposure(increaseStat(this.composure, enhancementLevel));
        enhancedStat.setDiving(increaseStat(this.diving, enhancementLevel));
        enhancedStat.setHandling(increaseStat(this.handling, enhancementLevel));
        enhancedStat.setKick(increaseStat(this.Kick, enhancementLevel));
        enhancedStat.setReflexes(increaseStat(this.reflexes, enhancementLevel));
        enhancedStat.setGkposition(increaseStat(this.gkposition, enhancementLevel));
        enhancedStat.setTeamColorNames(this.teamColorNames);

        // positionstat 필드를 강화 단계에 따라 증가시키기
        Map<String, Integer> enhancedPositionStat = this.positionstat.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> increaseStat(entry.getValue(), enhancementLevel)
                ));
        enhancedStat.setPositionstat(enhancedPositionStat);

        return enhancedStat;
    }

    private Integer increaseStat(Integer originalStat, int enhancementLevel) {
        if (originalStat == null) return null;

        int[] cumulativeIncreases = {0, 1, 2, 4, 6, 8, 11, 15, 19, 24};
        int increase = cumulativeIncreases[Math.min(enhancementLevel - 1, 9)];

        return originalStat + increase;
    }
    public void filterStatsBasedOnPosition() {
        if ("GK".equals(bestPosition)) {
            // 골키퍼일 경우 필드 플레이어 스탯을 null로 설정
            setAvgSpeed(null);
            setAvgShooting(null);
            setAvgPassing(null);
            setAvgDribble(null);
            setAvgDefence(null);
            setAvgPhysical(null);
            setFieldPlayerStats(null);
        } else {
            // 필드 플레이어일 경우 골키퍼 스탯을 null로 설정
            setGkDiving(null);
            setGkHandling(null);
            setGkKick(null);
            setGkReaction(null);
            setGkSpeed(null);
            setGkLocation(null);
            setGoalkeeperStats(null);
        }
    }

    //최고 포지션 스탯을 반환하는 매서드
    public int getMaxPositionStat() {
        return positionstat.values().stream().mapToInt(Integer::intValue).max().orElse(0);
    }

    @JsonProperty("fieldPlayerStats")
    public List<Integer> getFieldPlayerStats() {
        return "GK".equals(bestPosition) ? null : fieldPlayerStats;
    }

    @JsonProperty("goalkeeperStats")
    public List<Integer> getGoalkeeperStats() {
        return "GK".equals(bestPosition) ? goalkeeperStats : null;
    }

    // positionstat 필드를 JSON 문자열로 직렬화 및 역직렬화
    public String getPositionstatJson() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(positionstat);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void setPositionstatJson(String positionstatJson) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.positionstat = mapper.readValue(positionstatJson, mapper.getTypeFactory().constructMapType(Map.class, String.class, Integer.class));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            this.positionstat = null;
        }
    }
}


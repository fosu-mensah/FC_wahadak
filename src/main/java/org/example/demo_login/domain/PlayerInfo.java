package org.example.demo_login.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlayerInfo {
    private int pid;

    @JsonProperty("선수이름")
    private String pname;

    @JsonProperty("이미지 URL")
    private String imageUrl; // 이미지 URL 필드 추가

    @JsonProperty("시즌")
    private String season; // 시즌 필드 추가

    @JsonProperty("시즌 URL")
    private String seasonUrl; // 시즌 URL 필드 추가

    @JsonProperty("국적")
    private String nation;

    @JsonProperty("포지션")
    private String bestPosition;

    @JsonProperty("포지션 스탯")
    private Map<String, Integer> positionstat = new HashMap<>();

    @JsonProperty("급여")
    private String pay;

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

    @JsonProperty("특성")
    private String traits;

    @JsonProperty("스피드")
    private Integer avgSpeed;

    @JsonProperty("슛")
    private Integer avgShooting;

    @JsonProperty("패스")
    private Integer avgPassing;

    @JsonProperty("드리블")
    private Integer avgDribble;

    @JsonProperty("수비")
    private Integer avgDefence;

    @JsonProperty("피지컬")
    private Integer avgPhysical;

    @JsonProperty("다이빙")
    private Integer gkDiving;

    @JsonProperty("골핸들링")
    private Integer gkHandling;

    @JsonProperty("킥")
    private Integer gkKick;

    @JsonProperty("반응속도")
    private Integer gkReaction;

    @JsonProperty("GK 스피드")
    private Integer gkSpeed;

    @JsonProperty("위치선정")
    private Integer gkLocation;

    @JsonProperty("클럽 경력")
    private List<Career> career;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Integer> fieldPlayerStats;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Integer> goalkeeperStats;

    @JsonIgnore
    private String positionstatJson;

    private List<String> teamColorNames;


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

    // Career 클래스 정의
    @Data
    public static class Career {
        private String club;
        private String year;
    }
}

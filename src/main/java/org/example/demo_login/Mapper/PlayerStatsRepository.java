package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.*;
import org.example.demo_login.domain.PlayerStat;
import org.example.demo_login.util.JsonTypeHandler;

import java.util.List;
import java.util.Map;

@Mapper
public interface PlayerStatsRepository {

    @Select("SELECT Pid , Pname, speed, accr, finish, shotpower, longshot, positioning, volley, penalty, shortpass, vision, `cross`, " +
            "longpass, freekick, curve, dribbling, ballcontroll, agility, balance, reaction, defending, tackling, intercept, " +
            "header, slidingtackle, strength, stamina, aggression, jump, composure, diving, handling, gkkick AS Kick, reflexes, " +
            "gkposition, positionstat AS positionstatJson, pay, BP1, season_url AS seasonUrl, season " +
            "FROM playerStat WHERE Pid = #{Pid}")
    @Results({
            @Result(property = "career", column = "career", javaType = List.class, typeHandler = JsonTypeHandler.class)
    })
    List<PlayerStat> findPlayerStatsByPid(@Param("Pid") int Pid);

    //선수 이름과 시즌으로 PlayerStat 목록 검색
    @Select("SELECT ps.Pid, ps.Pname, ps.speed, ps.accr, ps.finish, ps.shotpower, ps.longshot, ps.positioning, ps.volley, ps.penalty, ps.shortpass, ps.vision, ps.`cross`, " +
            "ps.longpass, ps.freekick, ps.curve, ps.dribbling, ps.ballcontroll, ps.agility, ps.balance, ps.reaction, ps.defending, ps.tackling, ps.intercept, " +
            "ps.header, ps.slidingtackle, ps.strength, ps.stamina, ps.aggression, ps.jump, ps.composure, ps.diving, ps.handling, ps.gkkick AS Kick, ps.reflexes, " +
            "ps.gkposition, ps.positionstat AS positionstatJson, ps.pay, ps.BP1, ps.season_url AS seasonUrl, ps.season, " +
            "pi.nation, pi.birth, pi.height, pi.weight, pi.body, pi.skill, pi.foot, pi.famous, pi.career, pi.traits, " +
            "pi.avg_speed AS avgSpeed, pi.avg_shooting AS avgShooting, pi.avg_passing AS avgPassing, pi.avg_dribble AS avgDribble, " +
            "pi.avg_defence AS avgDefence, pi.avg_physical AS avgPhysical, pi.gk_diving AS gkDiving, pi.gk_handling AS gkHandling, " +
            "pi.gk_kick AS gkKick, pi.gk_reaction AS gkReaction, pi.gk_speed AS gkSpeed, pi.gk_location AS gkLocation " +
            "FROM playerStat ps " +
            "JOIN playerInfo pi ON ps.pid = pi.pid " +
            "WHERE ps.pname LIKE CONCAT('%', #{pname}, '%') AND ps.season = #{season}")
    @Results({
            @Result(property = "positionstat", column = "positionstat", javaType = Map.class, typeHandler = JsonTypeHandler.class)
    })
    List<PlayerStat> findPlayerStatsByNameAndSeason(@Param("pname") String pname, @Param("season") String season);

    // 시즌별로 선수 정보를 검색하는 메서드 추가
    @Select("SELECT ps.Pid, ps.Pname, ps.speed, ps.accr, ps.finish, ps.shotpower, ps.longshot, ps.positioning, ps.volley, ps.penalty, ps.shortpass, ps.vision, ps.`cross`, " +
            "ps.longpass, ps.freekick, ps.curve, ps.dribbling, ps.ballcontroll, ps.agility, ps.balance, ps.reaction, ps.defending, ps.tackling, ps.intercept, " +
            "ps.header, ps.slidingtackle, ps.strength, ps.stamina, ps.aggression, ps.jump, ps.composure, ps.diving, ps.handling, ps.gkkick AS Kick, ps.reflexes, " +
            "ps.gkposition, ps.positionstat AS positionstatJson, ps.pay, ps.BP1, ps.season_url AS seasonUrl, ps.season, " +
            "pi.nation , pi.bestPosition ,pi.birth, pi.height, pi.weight, pi.body, pi.skill, pi.foot, pi.famous, pi.career, pi.traits, " +
            "pi.avg_speed AS avgSpeed, pi.avg_shooting AS avgShooting, pi.avg_passing AS avgPassing, pi.avg_dribble AS avgDribble, " +
            "pi.avg_defence AS avgDefence, pi.avg_physical AS avgPhysical, pi.gk_diving AS gkDiving, pi.gk_handling AS gkHandling, " +
            "pi.gk_kick AS gkKick, pi.gk_reaction AS gkReaction, pi.gk_speed AS gkSpeed, pi.gk_location AS gkLocation " +
            "FROM playerStat ps " +
            "JOIN playerInfo pi ON ps.pid = pi.pid " +
            "WHERE ps.season = #{season}")
    @Results({
            @Result(property = "career", column = "career", javaType = List.class, typeHandler = JsonTypeHandler.class)
    })
    List<PlayerStat> findPlayerStatsBySeason(@Param("season") String season);
}

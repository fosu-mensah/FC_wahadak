package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.*;
import org.example.demo_login.domain.PlayerInfo;
import org.example.demo_login.util.JsonTypeHandler;

import java.util.List;

@Mapper
public interface PlayerInfoRepository {
    // 선수 이름으로 PlayerInfo 목록을 검색
    @Select("SELECT Pid, pname, nation, bestPosition, birth, height, weight, body, skill, foot, famous, career, " +
            "avg_speed AS avgSpeed, avg_shooting AS avgShooting, avg_passing AS avgPassing, avg_dribble AS avgDribble, " +
            "avg_defence AS avgDefence, avg_physical AS avgPhysical, gk_diving AS gkDiving, gk_handling AS gkHandling, " +
            "gk_kick AS gkKick, gk_reaction AS gkReaction, gk_speed AS gkSpeed, gk_location AS gkLocation, traits " +
            "FROM playerInfo WHERE pname LIKE CONCAT('%', #{Pname}, '%')")
    @Results({
            @Result(property = "career", column = "career", javaType = List.class, typeHandler = JsonTypeHandler.class)
    })
    List<PlayerInfo> findPlayerInfoByName(@Param("Pname") String Pname);

    //선수 ID로 PlayerInfo 검색
    @Select("SELECT Pid, Pname, nation, bestPosition, birth, height, weight, body, skill, foot, famous, career, " +
            "avg_speed AS avgSpeed, avg_shooting AS avgShooting, avg_passing AS avgPassing, avg_dribble AS avgDribble, " +
            "avg_defence AS avgDefence, avg_physical AS avgPhysical, gk_diving AS gkDiving, gk_handling AS gkHandling, " +
            "gk_kick AS gk_kick, gk_reaction AS gkReaction, gk_speed AS gkSpeed, gk_location AS gkLocation, traits " +
            "FROM playerInfo WHERE Pid = #{Pid}")
    @Results({
            @Result(property = "career", column = "career", javaType = List.class, typeHandler = JsonTypeHandler.class),
            @Result(property = "career", column = "career", javaType = List.class, typeHandler = JsonTypeHandler.class)
    })
    PlayerInfo findPlayerInfoByPid(@Param("Pid") int Pid);

    //특정 팀 컬러에 속한 선수 목록을 검색
    @Select("<script>" +
            "SELECT Pid, pname, nation, bestPosition, birth, height, weight, body, skill, foot, famous, career, " +
            "avg_speed AS avgSpeed, avg_shooting AS avgShooting, avg_passing AS avgPassing, avg_dribble AS avgDribble, " +
            "avg_defence AS avgDefence, avg_physical AS avgPhysical, gk_diving AS gkDiving, gk_handling AS gkHandling, " +
            "gk_kick AS gkKick, gk_reaction AS gkReaction, gk_speed AS gkSpeed, gk_location AS gkLocation, traits " +
            "FROM playerInfo WHERE pname IN " +
            "<foreach item='player' collection='players' open='(' separator=',' close=')'>" +
            "#{player}" +
            "</foreach>" +
            "</script>")
    @Results({
            @Result(property = "career", column = "career", javaType = List.class, typeHandler = JsonTypeHandler.class)
    })
    List<PlayerInfo> findPlayerInfoByNames(@Param("players") List<String> players);


}
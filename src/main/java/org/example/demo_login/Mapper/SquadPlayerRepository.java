package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.*;
import org.example.demo_login.domain.SquadPlayer;
import org.example.demo_login.util.JsonTypeHandler;

import java.util.List;

@Mapper
public interface SquadPlayerRepository {

    //스쿼드 안에 선수 조회
    @Select("SELECT sp.*, pi.*, ps.pay " +
            "FROM squad_player sp " +
            "JOIN playerInfo pi ON sp.player_id = pi.Pid " +
            "JOIN playerStat ps ON sp.player_id = ps.pid " +
            "WHERE sp.squad_id = #{squadId}")
    @Results({
            @Result(column="id", property="id"),
            @Result(column="squad_id", property="squadId"),
            @Result(column="player_id", property="playerId"),
            @Result(column="position", property="position"),
            @Result(column="Pid", property="playerInfo.pid"),
            @Result(column="Pname", property="playerInfo.pname"),
            @Result(column="nation", property="playerInfo.nation"),
            @Result(column="bestposition", property="playerInfo.bestPosition"),
            @Result(column="birth", property="playerInfo.birth"),
            @Result(column="height", property="playerInfo.height"),
            @Result(column="weight", property="playerInfo.weight"),
            @Result(column="body", property="playerInfo.body"),
            @Result(column="skill", property="playerInfo.skill"),
            @Result(column="foot", property="playerInfo.foot"),
            @Result(column="famous", property="playerInfo.famous"),
            @Result(column="career", property="playerInfo.career", typeHandler= JsonTypeHandler.class),
            @Result(column="traits", property="playerInfo.traits"),
            @Result(column="avg_speed", property="playerInfo.avgSpeed"),
            @Result(column="avg_shooting", property="playerInfo.avgShooting"),
            @Result(column="avg_passing", property="playerInfo.avgPassing"),
            @Result(column="avg_dribble", property="playerInfo.avgDribble"),
            @Result(column="avg_defence", property="playerInfo.avgDefence"),
            @Result(column="avg_physical", property="playerInfo.avgPhysical"),
            @Result(column="gk_diving", property="playerInfo.gkDiving"),
            @Result(column="gk_handling", property="playerInfo.gkHandling"),
            @Result(column="gk_kick", property="playerInfo.gkKick"),
            @Result(column="gk_reaction", property="playerInfo.gkReaction"),
            @Result(column="gk_speed", property="playerInfo.gkSpeed"),
            @Result(column="gk_location", property="playerInfo.gkLocation"),
            @Result(column="pay", property="playerInfo.pay"),
    })
    List<SquadPlayer> selectSquadPlayersBySquadId(int squadId);


    @Select("SELECT * FROM squad_player WHERE id = #{id}")
    @Results({
            @Result(column="id", property="id"),
            @Result(column="squad_id", property="squadId"),
            @Result(column="player_id", property="playerId"),
            @Result(column="position", property="position"),
            @Result(column="Pid", property="playerInfo.pid"),
            @Result(column="Pname", property="playerInfo.pname"),
            @Result(column="nation", property="playerInfo.nation"),
            @Result(column="bestposition", property="playerInfo.bestPosition"),
            @Result(column="birth", property="playerInfo.birth"),
            @Result(column="height", property="playerInfo.height"),
            @Result(column="weight", property="playerInfo.weight"),
            @Result(column="body", property="playerInfo.body"),
            @Result(column="skill", property="playerInfo.skill"),
            @Result(column="foot", property="playerInfo.foot"),
            @Result(column="famous", property="playerInfo.famous"),
            @Result(column="career", property="playerInfo.career", typeHandler= JsonTypeHandler.class),
            @Result(column="traits", property="playerInfo.traits"),
            @Result(column="avg_speed", property="playerInfo.avgSpeed"),
            @Result(column="avg_shooting", property="playerInfo.avgShooting"),
            @Result(column="avg_passing", property="playerInfo.avgPassing"),
            @Result(column="avg_dribble", property="playerInfo.avgDribble"),
            @Result(column="avg_defence", property="playerInfo.avgDefence"),
            @Result(column="avg_physical", property="playerInfo.avgPhysical"),
            @Result(column="gk_diving", property="playerInfo.gkDiving"),
            @Result(column="gk_handling", property="playerInfo.gkHandling"),
            @Result(column="gk_kick", property="playerInfo.gkKick"),
            @Result(column="gk_reaction", property="playerInfo.gkReaction"),
            @Result(column="gk_speed", property="playerInfo.gkSpeed"),
            @Result(column="gk_location", property="playerInfo.gkLocation"),
    })
    SquadPlayer selectSquadPlayerById(int id);

    // 유저가 스쿼드에 선수를 집어 넣을때
    @Insert("INSERT INTO squad_player (squad_id, player_id, position) VALUES (#{squadId}, #{playerId}, #{position})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertSquadPlayer(SquadPlayer squadPlayer);

    // 유저가 스쿼드안에 있는 선수를 삭제할때.
    @Delete("DELETE FROM squad_player WHERE id = #{id}")
    void deleteSquadPlayer(int id);

    //특정 스쿼드안에 있는 모든 선수를 삭제할때
    @Delete("DELETE FROM squad_player WHERE squad_id = #{squadId}")
    void deleteAllSquadPlayersBySquadId(int squadId);

    // 스쿼드 안에 있는 모든 선수 삭제
    @Delete("DELETE FROM squad_player WHERE squad_id = #{squadId}")
    void deleteBySquadId(int squadId);
}

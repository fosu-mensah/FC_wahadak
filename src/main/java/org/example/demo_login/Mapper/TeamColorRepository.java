package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.*;
import org.example.demo_login.domain.TeamColor;
import org.example.demo_login.util.JsonTypeHandler;

import java.util.List;


public interface TeamColorRepository {


    @Select("SELECT * FROM team_color WHERE id = #{id}")
    @Results({
            @Result(column = "id", property = "id"),
            @Result(column = "team_color_name", property = "teamColorName"),
            @Result(column = "team_level", property = "teamLevel"),
            @Result(column = "effect", property = "effect", typeHandler = JsonTypeHandler.class),
            @Result(column = "players", property = "players", typeHandler = JsonTypeHandler.class)
    })
    TeamColor selectTeamColorById(int id);

    //모든 팀컬러 목록 조회
    @Select("SELECT * FROM team_color")
    @Results({
            @Result(column = "id", property = "id"),
            @Result(column = "team_color_name", property = "teamColorName"),
            @Result(column = "team_level", property = "teamLevel"),
            @Result(column = "effect", property = "effect", typeHandler = JsonTypeHandler.class),
            @Result(column = "players", property = "players", typeHandler = JsonTypeHandler.class)
    })
    List<TeamColor> selectAllTeamColors();

    @Select("select * from team_color where team_color_name = #{teamColorName}")
    @Results({
            @Result(column = "id", property = "id"),
            @Result(column = "team_color_name", property = "teamColorName"),
            @Result(column = "team_level", property = "teamLevel"),
            @Result(column = "effect", property = "effect", typeHandler = JsonTypeHandler.class),
            @Result(column = "players", property = "players", typeHandler = JsonTypeHandler.class)
    })
    TeamColor findByName(@Param("teamColorName") String teamColorName);
}

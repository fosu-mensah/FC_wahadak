package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.example.demo_login.domain.SoccerLeagueRanking;

import java.util.List;

@Mapper
public interface SoccerLeagueRankingRepository {

    @Select("SELECT * FROM soccer_league_rankings WHERE league_type = #{leagueType} ORDER BY `rank` ASC")
    List<SoccerLeagueRanking> selectLeagueRankingsByType(@Param("leagueType") String leagueType);
}
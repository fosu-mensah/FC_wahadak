package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.*;
import org.example.demo_login.domain.Squad;
import java.util.List;

@Mapper
public interface SquadRepository {

    @Select("SELECT * FROM squad WHERE squad_id = #{squadId}")
    @Results({
            @Result(column="squad_id", property="squadId"),
            @Result(column="user_nickname", property="userNickname"),
            @Result(column="formation_id", property="formationId"),
            @Result(column="squad_name", property="squadName"),
            @Result(column="total_pay", property="totalPay")
    })
    Squad selectSquadById(int squadId);

    @Select("SELECT s.*, f.formation_name " +
            "FROM squad s " +
            "JOIN formation f ON s.formation_id = f.formation_id " +
            "WHERE s.user_nickname = #{userNickname}")
    @Results({
            @Result(column="squad_id", property="squadId"),
            @Result(column="user_nickname", property="userNickname"),
            @Result(column="formation_id", property="formationId"),
            @Result(column="squad_name", property="squadName"),
            @Result(column="total_pay", property="totalPay"),
            @Result(column="formation_name", property="formationName"),
    })
    List<Squad> selectSquadsByUserNickname(String userNickname);

    // 모든 스쿼드를 조회하는 메소드 추가
    @Select("SELECT s.*, f.formation_name " +
            "FROM squad s " +
            "JOIN formation f ON s.formation_id = f.formation_id ")
    @Results({
            @Result(column="squad_id", property="squadId"),
            @Result(column="user_nickname", property="userNickname"),
            @Result(column="formation_id", property="formationId"),
            @Result(column="squad_name", property="squadName"),
            @Result(column="total_pay", property="totalPay"),
            @Result(column="formation_name", property="formationName"),
    })
    List<Squad> selectAllSquads();
    // 유저 스쿼드 만들때..
    @Insert("INSERT INTO squad (user_nickname, formation_id, squad_name, total_pay) VALUES (#{userNickname}, #{formationId}, #{squadName}, #{totalPay})")
    @Options(useGeneratedKeys = true, keyProperty = "squadId")
    void insertSquad(Squad squad);

    //유저 스쿼드 갱신 할때..
    @Update("UPDATE squad SET user_nickname = #{userNickname}, formation_id = #{formationId}, squad_name = #{squadName}, total_pay = #{totalPay} WHERE squad_id = #{squadId}")
    void updateSquad(Squad squad);

    // 유저가 스쿼드를 삭제할떄...
    @Delete("DELETE FROM squad WHERE squad_id = #{squadId}")
    void deleteSquad(int squadId);
}

package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.*;
import org.example.demo_login.domain.Member;

import java.util.List;

@Mapper
public interface MemberRepository {

    @Select("SELECT * FROM member")
    List<Member> selectAll();

    @Insert("INSERT INTO member(name, email, userPw, nickname, age, phone) " +
            "VALUES(#{name}, #{email}, #{userPw}, #{nickname}, #{age}, #{phone})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Member member);

    @Select("SELECT * FROM member WHERE email = #{email} AND userPw = #{password}")
    Member login(@Param("email") String email, @Param("password") String password);

    @Select("SELECT * FROM member WHERE nickname = #{name}")
    Member findByUsername(@Param("name") String name);

    @Select("SELECT * FROM member WHERE email = #{email}")
    Member findByEmail(@Param("email") String email);
}

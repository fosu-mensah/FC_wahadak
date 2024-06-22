package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.*;
import org.example.demo_login.domain.Member;
import java.util.List;

@Mapper
public interface MemberRepository {

    // Member 테이블 회원 조회
    @Select("SELECT * FROM member")
    List<Member> selectAll();

    // Member 테이블에 회원 데이터 삽입
    @Insert("INSERT INTO member(name, email, userPw, nickname, age, phone) " +
            "VALUES(#{name}, #{email}, #{userPw}, #{nickname}, #{age}, #{phone})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Member member);

    // 이메일과 비밀번호로 로그인
    @Select("SELECT * FROM member WHERE email = #{email} AND userPw = #{password}")
    Member login(@Param("email") String email, @Param("password") String password);

    // 닉네임으로 회원 조회
    @Select("SELECT * FROM member WHERE nickname = #{name}")
    Member findByUsername(@Param("name") String name);

    // 이메일로 회원 조회
    @Select("SELECT * FROM member WHERE email = #{email}")
    Member findByEmail(@Param("email") String email);

    // 전화번호로 회원 조회
    @Select("SELECT * FROM member WHERE phone = #{phone}")
    Member findByPhone(@Param("phone") String phone);

    // 역할 업데이트
    @Update("UPDATE member SET role = #{role} WHERE id = #{id}")
    void updateRole(@Param("id") int id, @Param("role") String role);
}

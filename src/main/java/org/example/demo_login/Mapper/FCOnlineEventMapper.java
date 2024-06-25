package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.example.demo_login.domain.FCOnlineEvent;

import java.util.List;

@Mapper
public interface FCOnlineEventMapper {

    // 페이징된 이벤트 조회
    @Select("SELECT * FROM fconlineevent LIMIT #{pageSize} OFFSET #{offset}")
    List<FCOnlineEvent> selectFCOnlineEvents(@Param("pageSize") int pageSize, @Param("offset") int offset);

    // 총 이벤트 수 조회
    @Select("SELECT COUNT(*) FROM fconlineevent")
    int countFCOnlineEvents();
}
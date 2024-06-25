package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.*;
import org.example.demo_login.domain.FCWahadakEvent;

import java.util.List;

@Mapper
public interface FCWahadakEventMapper {

    @Select("SELECT * FROM fcwahadakevent LIMIT #{pageSize} OFFSET #{offset}")
    List<FCWahadakEvent> selectFCWahadakEvents(@Param("pageSize") int pageSize, @Param("offset") int offset);

    @Select("SELECT COUNT(*) FROM fcwahadakevent")
    int countFCWahadakEvents();

    @Select("SELECT * FROM fcwahadakevent WHERE event_id = #{event_id}")
    FCWahadakEvent getEventById(int event_id);

    @Insert("INSERT INTO fcwahadakevent (creator_id, event_title, event_content, event_img_url, event_date_start, event_date_end) " +
            "VALUES (#{creator_id}, #{event_title}, #{event_content}, #{event_img_url}, #{event_date_start}, #{event_date_end})")
    void insertEvent(FCWahadakEvent event);

    @Update("UPDATE fcwahadakevent SET event_title = #{event_title}, event_content = #{event_content}, " +
            "event_img_url = #{event_img_url}, event_date_start = #{event_date_start}, event_date_end = #{event_date_end} WHERE event_id = #{event_id}")
    void updateEvent(FCWahadakEvent event);

    @Delete("DELETE FROM fcwahadakevent WHERE event_id = #{event_id}")
    void deleteEvent(int event_id);
}
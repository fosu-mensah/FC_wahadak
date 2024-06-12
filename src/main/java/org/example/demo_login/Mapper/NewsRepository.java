package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.example.demo_login.domain.News;
import java.util.List;

@Mapper
public interface NewsRepository {

    // 모든 뉴스를 페이징 처리하여 조회
    @Select("SELECT * FROM news LIMIT #{limit} OFFSET #{offset}")
    List<News> findAll(@Param("limit") int limit, @Param("offset") int offset);

    // 국내 축구 뉴스 조회
    @Select("SELECT * FROM news WHERE news_category_id = 1 LIMIT #{limit} OFFSET #{offset}")
    List<News> findDomesticNews(@Param("limit") int limit, @Param("offset") int offset);

    // 해외 축구 뉴스 조회
    @Select("SELECT * FROM news WHERE news_category_id = 2 LIMIT #{limit} OFFSET #{offset}")
    List<News> findInternationalNews(@Param("limit") int limit, @Param("offset") int offset);

    // 442 독점 축구 뉴스 조회
    @Select("SELECT * FROM news WHERE news_category_id = 3 LIMIT #{limit} OFFSET #{offset}")
    List<News> findExclusiveNews(@Param("limit") int limit, @Param("offset") int offset);

    // 총 뉴스 수 조회
    @Select("SELECT COUNT(*) FROM news")
    int countAllNews();

    // 각 카테고리별 총 뉴스 수 조회
    @Select("SELECT COUNT(*) FROM news WHERE news_category_id = #{categoryId}")
    int countNewsByCategory(@Param("categoryId") int categoryId);

    // 페이징 처리된 뉴스 조회
    @Select("SELECT * FROM news WHERE news_category_id = #{categoryId} LIMIT #{limit} OFFSET #{offset}")
    List<News> findNewsByCategory(@Param("categoryId") int categoryId, @Param("limit") int limit, @Param("offset") int offset);
}
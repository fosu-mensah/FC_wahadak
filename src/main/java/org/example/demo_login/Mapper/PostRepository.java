package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.*;
import org.example.demo_login.domain.Post;

import java.util.List;

@Mapper
public interface PostRepository {

    // 모든 게시물을 조회하는 쿼리
    @Select("SELECT p.id, p.category, p.title, p.content, p.created_at, p.like_count, m.nickname AS memberNickname " +
            "FROM post p INNER JOIN member m ON p.member_nickname = m.nickname")
    List<Post> selectPosts();

    // 새로운 게시물을 작성하는 쿼리
    @Insert("INSERT INTO post (member_nickname, category, title, content, created_at, like_count, image_url) " +
            "VALUES (#{memberNickname}, #{category}, #{title}, #{content}, #{created_at}, #{like_count}, #{image_url})")
    void insertPost(Post post);

    // 카테고리별 게시물을 조회하는 쿼리
    @Select("<script>" +
            "SELECT p.id, p.category, p.title, p.content, p.created_at, p.like_count, m.nickname AS memberNickname " +
            "FROM post p INNER JOIN member m ON p.member_nickname = m.nickname " +
            "<where>" +
            "<if test='category != null'>" +
            "AND p.category = #{category} " +
            "</if>" +
            "</where>" +
            "<if test='sortBy != null and sortBy.equals(\"createdAt\")'>" +
            "ORDER BY p.created_at " +
            "<choose>" +
            "<when test='order != null and order.equals(\"asc\")'>" +
            "ASC" +
            "</when>" +
            "<otherwise>" +
            "DESC" +
            "</otherwise>" +
            "</choose>" +
            "</if>" +
            "<if test='sortBy != null and sortBy.equals(\"likeCount\")'>" +
            "ORDER BY p.like_count " +
            "<choose>" +
            "<when test='order != null and order.equals(\"asc\")'>" +
            "ASC" +
            "</when>" +
            "<otherwise>" +
            "DESC" +
            "</otherwise>" +
            "</choose>" +
            "</if>" +
            "</script>")
    List<Post> selectPostsSorted(@Param("sortBy") String sortBy, @Param("order") String order, @Param("category") String category);

    // 인기 게시물을 조회하는 쿼리
    @Select("SELECT p.id, p.category, p.title, p.content, p.created_at, p.like_count, m.nickname AS memberNickname " +
            "FROM post p INNER JOIN member m ON p.member_nickname = m.nickname " +
            "WHERE p.like_count >= 10")
    List<Post> selectPopularPosts();

    // 게시물을 검색하는 쿼리
    @Select("<script>" +
            "SELECT p.id, p.category, p.title, p.content, p.created_at, p.like_count, m.nickname AS memberNickname " +
            "FROM post p INNER JOIN member m ON p.member_nickname = m.nickname " +
            "<if test='term != null and term != \"\"'>" +
            "    <choose>" +
            "        <when test='category.equals(\"title\")'>" +
            "            AND LOWER(p.title) LIKE LOWER(CONCAT('%', #{term}, '%'))" +
            "        </when>" +
            "        <when test='category.equals(\"category\")'>" +
            "            AND LOWER(p.category) LIKE LOWER(CONCAT('%', #{term}, '%'))" +
            "        </when>" +
            "        <when test='category.equals(\"memberNickname\")'>" +
            "            AND LOWER(m.nickname) LIKE LOWER(CONCAT('%', #{term}, '%'))" +
            "        </when>" +
            "    </choose>" +
            "</if>" +
            "</script>")
    List<Post> searchPosts(@Param("category") String category, @Param("term") String term);

    // 특정 게시물의 상세 정보를 조회하는 쿼리
    @Select("SELECT p.id, p.category, p.title, p.content, p.created_at, p.like_count, p.image_url, m.nickname AS memberNickname " +
            "FROM post p INNER JOIN member m ON p.member_nickname = m.nickname " +
            "WHERE p.id = #{postId}")
    Post getPostDetails(@Param("postId") int postId);

    // 특정 게시물에 좋아요를 추가하는 쿼리
    @Insert("INSERT INTO likes (post_id, member_nickname) VALUES (#{postId}, #{nickname})")
    void likePost(@Param("postId") int postId, @Param("nickname") String nickname);

    // 특정 게시물에 좋아요를 삭제하는 쿼리
    @Delete("DELETE FROM likes WHERE post_id = #{postId} AND member_nickname = #{nickname}")
    void unlikePost(@Param("postId") int postId, @Param("nickname") String nickname);

    // 특정 게시물의 좋아요 개수를 조회하는 쿼리
    @Select("SELECT COUNT(*) FROM likes WHERE post_id = #{postId}")
    int getLikeCountByPostId(@Param("postId") int postId);

    // 특정 게시물의 좋아요 개수를 업데이트하는 쿼리
    @Update("UPDATE post SET like_count = (SELECT COUNT(*) FROM likes WHERE post_id = #{postId}) WHERE id = #{postId}")
    void updateLikeCount(@Param("postId") int postId);

    // 특정 게시물의 댓글을 삭제하는 쿼리
    @Delete("DELETE FROM comment WHERE post_id = #{postId}")
    void deleteCommentsByPostId(@Param("postId") int postId);

    // 게시물 삭제 쿼리
    @Delete("DELETE FROM post WHERE id = #{postId}")
    void deletePost(@Param("postId") int postId);

    // 게시물 수정 쿼리
    @Update("UPDATE post SET category = #{category}, title = #{title}, content = #{content}, image_url = #{image_url} WHERE id = #{id} AND member_nickname = #{memberNickname}")
    void updatePost(Post post);

    // 특정 게시물에 사용자가 좋아요를 눌렀는지 확인하는 쿼리
    @Select("SELECT COUNT(*) > 0 FROM post_likes WHERE post_id = #{postId} AND member_nickname = #{nickname}")
    boolean isPostLikedByUser(@Param("postId") int postId, @Param("nickname") String nickname);
}
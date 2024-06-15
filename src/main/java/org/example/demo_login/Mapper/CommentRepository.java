package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.*;
import org.example.demo_login.domain.Comment;

import java.util.List;

@Mapper
public interface CommentRepository {

    // 새로운 댓글을 추가하는 쿼리
    @Insert("INSERT INTO comment (post_id, member_nickname, content) VALUES (#{postId}, #{memberNickname}, #{content})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void addComment(Comment comment);

    // 특정 게시물의 모든 댓글을 조회하는 쿼리
    @Results(id = "commentResultMap", value = {
            @Result(property = "id", column = "id"),
            @Result(property = "postId", column = "post_id"),
            @Result(property = "memberNickname", column = "member_nickname"),
            @Result(property = "content", column = "content"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at")
    })
    @Select("SELECT id, post_id, member_nickname, content, created_at, updated_at FROM comment WHERE post_id = #{postId} AND is_deleted = FALSE ORDER BY created_at DESC")
    List<Comment> selectCommentsByPostId(int postId);

    // 특정 댓글을 조회하는 쿼리
    @Select("SELECT id, post_id, member_nickname, content, created_at, updated_at FROM comment WHERE id = #{id}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "postId", column = "post_id"),
            @Result(property = "memberNickname", column = "member_nickname"),
            @Result(property = "content", column = "content"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at"),
            @Result(property = "isDeleted", column = "is_deleted")
    })
    Comment findCommentById(int id);

    // 댓글을 수정하는 쿼리
    @Update("UPDATE comment SET content = #{content}, updated_at = NOW() " +
            "WHERE id = #{commentId} AND member_nickname = #{memberNickname}")
    int updateComment(@Param("commentId") int commentId, @Param("memberNickname") String memberNickname, @Param("content") String content);

    // 댓글을 삭제하는 쿼리
    @Update("UPDATE comment SET is_deleted = TRUE " +
            "WHERE id= #{commentId} AND member_nickname = #{memberNickname}")
    int deleteComment(@Param("commentId") int commentId, @Param("memberNickname") String memberNickname);

    // 댓글에 좋아요를 추가하는 쿼리
    @Insert("INSERT INTO comment_likes (comment_id, member_nickname) VALUES (#{commentId}, #{nickname})")
    void likeComment(@Param("commentId") int commentId, @Param("nickname") String nickname);

    // 댓글에 좋아요를 삭제하는 쿼리
    @Delete("DELETE FROM comment_likes WHERE comment_id = #{commentId} AND member_nickname = #{nickname}")
    void unlikeComment(@Param("commentId") int commentId, @Param("nickname") String nickname);

    // 특정 댓글의 좋아요 개수를 조회하는 쿼리
    @Select("SELECT COUNT(*) FROM comment_likes WHERE comment_id = #{commentId}")
    int getLikeCountByCommentId(@Param("commentId") int commentId);
}
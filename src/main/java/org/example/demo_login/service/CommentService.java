package org.example.demo_login.service;

import org.example.demo_login.Mapper.CommentRepository;
import org.example.demo_login.domain.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private final CommentRepository mapper;

    public CommentService(CommentRepository mapper) {
        this.mapper = mapper;
    }

    // 새로운 댓글을 추가하는 메소드
    @Transactional
    public Comment addComment(int postId, String memberNickname, String content) {
        Comment comment = new Comment();
        comment.setPostId(postId);
        comment.setMemberNickname(memberNickname);
        comment.setContent(content);
        mapper.addComment(comment);
        return mapper.findCommentById(comment.getId(), memberNickname);
    }

    // 특정 게시물의 모든 댓글을 조회하는 메소드
    public List<Comment> getCommentsByPostId(int postId, String nickname) {
        List<Comment> comments = mapper.selectCommentsByPostId(postId);
        for (Comment comment : comments) {
            comment.setLiked(mapper.isCommentLikedByUser(comment.getId(), nickname));
        }
        return comments;
    }

    // 댓글을 수정하는 메소드
    public boolean updateComment(int commentId, String memberNickname, String content) {
        return mapper.updateComment(commentId, memberNickname, content) > 0;
    }

    // 댓글을 삭제하는 메소드
    public boolean deleteComment(int commentId, String memberNickname) {
        return mapper.deleteComment(commentId, memberNickname) > 0;
    }

    // 댓글에 좋아요를 추가하는 메소드
    public void likeComment(int commentId, String nickname) {
        mapper.likeComment(commentId, nickname);
    }

    // 댓글에 좋아요를 삭제하는 메소드
    public void unlikeComment(int commentId, String nickname) {
        mapper.unlikeComment(commentId, nickname);
    }

    // 특정 댓글의 좋아요 개수를 조회하는 메소드
    public int getLikeCountByCommentId(int commentId) {
        return mapper.getLikeCountByCommentId(commentId);
    }
}
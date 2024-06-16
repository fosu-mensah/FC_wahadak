package org.example.demo_login.controller;

import org.example.demo_login.domain.Comment;
import org.example.demo_login.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // 새로운 댓글을 추가하는 엔드포인트
    @PostMapping
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment) {
        try {
            Comment newComment = commentService.addComment(comment.getPostId(), comment.getMemberNickname(), comment.getContent());
            return ResponseEntity.status(HttpStatus.CREATED).body(newComment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 특정 게시물의 모든 댓글을 조회하는 엔드포인트
    @GetMapping("/posts/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable int postId, @RequestParam String nickname) {
        List<Comment> comments = commentService.getCommentsByPostId(postId, nickname);
        return ResponseEntity.ok(comments);
    }

    // 댓글을 수정하는 엔드포인트
    @PutMapping("/{commentId}")
    public ResponseEntity<Void> updateComment(@PathVariable int commentId, @RequestBody Comment comment) {
        if (commentService.updateComment(commentId, comment.getMemberNickname(), comment.getContent())) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    // 댓글을 삭제하는 엔드포인트
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable int commentId, @RequestParam String memberNickname) {
        if (commentService.deleteComment(commentId, memberNickname)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    // 특정 댓글에 좋아요를 추가하는 엔드포인트
    @PostMapping("/{commentId}/like")
    public ResponseEntity<Void> likeComment(@PathVariable int commentId, @RequestParam String nickname) {
        commentService.likeComment(commentId, nickname);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 특정 댓글에 좋아요를 삭제하는 엔드포인트
    @DeleteMapping("/{commentId}/like")
    public ResponseEntity<Void> unlikeComment(@PathVariable int commentId, @RequestParam String nickname) {
        commentService.unlikeComment(commentId, nickname);
        return ResponseEntity.ok().build();
    }

    // 특정 댓글의 좋아요 개수를 조회하는 엔드포인트
    @GetMapping("/{commentId}/likes")
    public ResponseEntity<Integer> getLikeCountByCommentId(@PathVariable int commentId) {
        int likeCount = commentService.getLikeCountByCommentId(commentId);
        return ResponseEntity.ok(likeCount);
    }
}
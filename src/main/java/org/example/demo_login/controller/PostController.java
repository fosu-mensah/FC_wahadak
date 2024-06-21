package org.example.demo_login.controller;

import org.example.demo_login.domain.Post;
import org.example.demo_login.service.FileStorageService;
import org.example.demo_login.service.PostService;
import org.example.demo_login.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final FileStorageService fileStorageService;

    @Autowired
    public PostController(PostService postService, JwtUtil jwtUtil, FileStorageService fileStorageService) {
        this.postService = postService;
        this.fileStorageService = fileStorageService;
    }

    // 모든 게시물을 조회하는 엔드포인트
    @GetMapping
    public ResponseEntity<List<Post>> getPosts(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String order,
            @RequestParam(required = false) String category) {
        List<Post> posts = postService.selectPostsSorted(sortBy, order, category);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    // 좋아요가 많은 인기 게시물을 조회하는 엔드포인트
    @GetMapping("/popular")
    public ResponseEntity<List<Post>> getPopularPosts() {
        List<Post> popularPosts = postService.selectPopularPosts();
        return new ResponseEntity<>(popularPosts, HttpStatus.OK);
    }

    // 새로운 게시물을 작성하는 엔드포인트
    @PostMapping(value = "/write", consumes = "multipart/form-data")
    public ResponseEntity<String> writePost(
            @RequestParam("memberNickname") String memberNickname,
            @RequestParam("category") String category,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            LocalDateTime createdAt = LocalDateTime.now();
            int likeCount = 0;

            String imageUrl = null;
            if (image != null && !image.isEmpty()) {
                imageUrl = fileStorageService.storeFile(image);
            }

            postService.writePost(memberNickname, category, title, content, imageUrl, createdAt, likeCount);

            return ResponseEntity.ok("게시글이 성공적으로 작성되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 작성 중 오류.");
        }
    }

    // 게시물을 검색하는 엔드포인트
    @GetMapping("/search")
    public ResponseEntity<List<Post>> searchPosts(@RequestParam String category, @RequestParam String term) {
        List<Post> posts = postService.searchPosts(category, term);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    // 특정 게시물의 상세 정보를 조회하는 엔드포인트
    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostDetails(@PathVariable int postId, @RequestParam(required = false) String nickname) {
        Post post = postService.getPostDetails(postId);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    // 게시물에 좋아요를 추가하는 엔드포인트
    @PostMapping("/{postId}/like")
    public ResponseEntity<Void> likePost(@PathVariable int postId, @RequestParam String nickname) {
        postService.likePost(postId, nickname);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 게시물에 좋아요를 삭제하는 엔드포인트
    @DeleteMapping("/{postId}/like")
    public ResponseEntity<Void> unlikePost(@PathVariable int postId, @RequestParam String nickname) {
        postService.unlikePost(postId, nickname);
        return ResponseEntity.ok().build();
    }

    // 특정 게시물의 좋아요 개수를 조회하는 엔드포인트
    @GetMapping("/{postId}/likes")
    public ResponseEntity<Integer> getLikeCountByPostId(@PathVariable int postId) {
        int likeCount = postService.getLikeCountByPostId(postId);
        return ResponseEntity.ok(likeCount);
    }

    // 게시물 삭제 엔드포인트
    @DeleteMapping("/{postId}/delete")
    public ResponseEntity<String> deletePost(@PathVariable int postId, @RequestParam String memberNickname) {
        try {
            postService.deletePost(postId, memberNickname);
            return ResponseEntity.ok("게시글이 성공적으로 삭제되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 삭제 중 오류.");
        }
    }

    // 게시물 수정 엔드포인트
    @PutMapping("/{postId}/edit")
    public ResponseEntity<String> editPost(
            @PathVariable int postId,
            @RequestParam("memberNickname") String memberNickname,
            @RequestParam("category") String category,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            String imageUrl = null;
            if (image != null && !image.isEmpty()) {
                imageUrl = fileStorageService.storeFile(image);
            }

            postService.updatePost(postId, memberNickname, category, title, content, imageUrl);
            return ResponseEntity.ok("게시글이 성공적으로 수정되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 수정 중 오류.");
        }
    }

    // 특정 게시물에 사용자가 좋아요를 눌렀는지 확인하는 엔드포인트
    @GetMapping("/{postId}/liked-by-user")
    public ResponseEntity<Boolean> isPostLikedByUser(@PathVariable int postId, @RequestParam String nickname) {
        boolean isLiked = postService.isPostLikedByUser(postId, nickname);
        return ResponseEntity.ok(isLiked);
    }

    // 좋아요 순으로 상위 6개의 게시물을 조회하는 엔드포인트
    @GetMapping("/top-liked")
    public ResponseEntity<List<Post>> getTop6PostsByLikes() {
        List<Post> topPosts = postService.getTop6PostsByLikes();
        return new ResponseEntity<>(topPosts, HttpStatus.OK);
    }
}
package org.example.demo_login.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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

@CrossOrigin(origins = {"http://localhost:3000", "http://ec2-3-139-91-37.us-east-2.compute.amazonaws.com"})
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

    @GetMapping
    public ResponseEntity<List<Post>> getPosts(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String order) {
        List<Post> posts = postService.selectPostsSorted(sortBy, order);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/popular")
    public ResponseEntity<List<Post>> getPopularPosts() {
        List<Post> popularPosts = postService.selectPopularPosts();
        return new ResponseEntity<>(popularPosts, HttpStatus.OK);
    }

    @Operation(
            summary = "Create a new post with image upload",
            description = "Create a new post with image upload",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Post created successfully"),
                    @ApiResponse(responseCode = "413", description = "Payload too large"),
                    @ApiResponse(responseCode = "500", description = "Internal server error")
            }
    )
    @PostMapping(value = "/write", consumes = "multipart/form-data")
    public ResponseEntity<String> writePost(
            @RequestParam("memberNickname") String memberNickname,
            @RequestParam("category") String category,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("image") MultipartFile image) {
        try {
            LocalDateTime createdAt = LocalDateTime.now();
            int likeCount = 0;

            String imageUrl = fileStorageService.storeFile(image);
            postService.writePost(memberNickname, category, title, content, imageUrl, createdAt, likeCount);

            return ResponseEntity.ok("게시글이 성공적으로 작성되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 작성 중 오류.");
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Post>> searchPosts(@RequestParam String category, @RequestParam String term) {
        List<Post> posts = postService.searchPosts(category, term);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostDetails(@PathVariable int postId, @RequestParam(required = false) String nickname) {
        Post post = postService.getPostDetails(postId);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }
}
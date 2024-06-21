package org.example.demo_login.service;

import org.example.demo_login.Mapper.CommentRepository;
import org.example.demo_login.Mapper.PostRepository;
import org.example.demo_login.domain.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public PostService(PostRepository postRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    // 모든 게시물을 조회하는 메소드
    public List<Post> select() {
        return postRepository.selectPosts();
    }

    // 새로운 게시물을 작성하는 메소드
    public void writePost(String memberNickname, String category, String title, String content, String image, LocalDateTime createdAt, int likeCount) {
        Post post = new Post();
        post.setMemberNickname(memberNickname);
        post.setCategory(category);
        post.setTitle(title);
        post.setContent(content);
        post.setImage_url(image);
        post.setCreated_at(createdAt);
        post.setLike_count(likeCount);

        postRepository.insertPost(post);
    }

    // 게시물을 정렬하여 조회하는 메소드
    public List<Post> selectPostsSorted(String sortBy, String order, String category) {
        if (order == null) {
            order = "desc"; // 기본값으로 내림차순 설정
        }
        return postRepository.selectPostsSorted(sortBy, order, category);
    }

    // 인기 게시물을 조회하는 메소드
    public List<Post> selectPopularPosts() {
        return postRepository.selectPopularPosts();
    }

    // 게시물을 검색하는 메소드
    public List<Post> searchPosts(String category, String term) {
        return postRepository.searchPosts(category, term);
    }

    // 특정 게시물의 상세 정보를 조회하는 메소드
    public Post getPostDetails(int postId) {
        return postRepository.getPostDetails(postId);
    }

    // 게시물에 좋아요를 추가하는 메소드
    @Transactional
    public void likePost(int postId, String nickname) {
        postRepository.likePost(postId, nickname);
        postRepository.updateLikeCount(postId); // 좋아요 수 업데이트
    }

    // 게시물에 좋아요를 삭제하는 메소드
    @Transactional
    public void unlikePost(int postId, String nickname) {
        postRepository.unlikePost(postId, nickname);
        postRepository.updateLikeCount(postId); // 좋아요 수 업데이트
    }

    // 특정 게시물의 좋아요 개수를 조회하는 메소드
    public int getLikeCountByPostId(int postId) {
        return postRepository.getLikeCountByPostId(postId);
    }

    // 게시물 삭제 메소드
    @Transactional
    public void deletePost(int postId, String memberNickname) {
        Post post = postRepository.getPostDetails(postId);
        if (post != null && post.getMemberNickname().equals(memberNickname)) {
            // 댓글의 좋아요 먼저 삭제
            commentRepository.deleteCommentLikesByPostId(postId);
            // 댓글 삭제
            commentRepository.deleteCommentsByPostId(postId);
            // 게시물 삭제
            postRepository.deletePost(postId);
        }
    }

    // 게시물 수정 메소드
    @Transactional
    public void updatePost(int postId, String memberNickname, String category, String title, String content, String imageUrl) {
        Post post = new Post();
        post.setId(postId);
        post.setMemberNickname(memberNickname);
        post.setCategory(category);
        post.setTitle(title);
        post.setContent(content);
        post.setImage_url(imageUrl);
        post.setCreated_at(LocalDateTime.now());

        postRepository.updatePost(post);
    }

    // 특정 게시물에 사용자가 좋아요를 눌렀는지 확인하는 메소드
    public boolean isPostLikedByUser(int postId, String nickname) {
        return postRepository.isPostLikedByUser(postId, nickname);
    }

    // 좋아요 순으로 상위 6개의 게시물을 조회하는 메서드
    public List<Post> getTop6PostsByLikes() {
        return postRepository.selectTop6PostsByLikes();
    }
}
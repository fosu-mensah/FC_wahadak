package org.example.demo_login.service;

import org.example.demo_login.Mapper.PostRepository;
import org.example.demo_login.domain.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {
    private final PostRepository mapper;

    @Autowired
    public PostService(PostRepository mapper) {
        this.mapper = mapper;
    }

    // 모든 게시물을 조회하는 메소드
    public List<Post> select() {
        return mapper.selectPosts();
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

        mapper.insertPost(post);
    }

    // 게시물을 정렬하여 조회하는 메소드
    public List<Post> selectPostsSorted(String sortBy, String order, String category) {
        if (order == null) {
            order = "desc"; // 기본값으로 내림차순 설정
        }
        return mapper.selectPostsSorted(sortBy, order, category);
    }

    // 인기 게시물을 조회하는 메소드
    public List<Post> selectPopularPosts() {
        return mapper.selectPopularPosts();
    }

    // 게시물을 검색하는 메소드
    public List<Post> searchPosts(String category, String term) {
        return mapper.searchPosts(category, term);
    }

    // 특정 게시물의 상세 정보를 조회하는 메소드
    public Post getPostDetails(int postId) {
        return mapper.getPostDetails(postId);
    }

    // 게시물에 좋아요를 추가하는 메소드
    @Transactional
    public void likePost(int postId, String nickname) {
        mapper.likePost(postId, nickname);
        mapper.updateLikeCount(postId); // 좋아요 수 업데이트
    }

    // 게시물에 좋아요를 삭제하는 메소드
    @Transactional
    public void unlikePost(int postId, String nickname) {
        mapper.unlikePost(postId, nickname);
        mapper.updateLikeCount(postId); // 좋아요 수 업데이트
    }

    // 특정 게시물의 좋아요 개수를 조회하는 메소드
    public int getLikeCountByPostId(int postId) {
        return mapper.getLikeCountByPostId(postId);
    }
}
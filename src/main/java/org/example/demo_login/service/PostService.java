package org.example.demo_login.service;

import org.example.demo_login.Mapper.PostRepository;
import org.example.demo_login.domain.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {
    private final PostRepository mapper;

    @Autowired
    public PostService(PostRepository mapper) {
        this.mapper = mapper;
    }

    public List<Post> select() {
        return mapper.selectPosts();
    }

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

    public List<Post> selectPostsSorted(String sortBy, String order) {
        if (order == null) {
            order = "desc"; // 기본값으로 내림차순 설정
        }
        return mapper.selectPostsSorted(sortBy, order);
    }

    public List<Post> selectPopularPosts() {
        return mapper.selectPopularPosts();
    }

    public List<Post> searchPosts(String category, String term) {
        return mapper.searchPosts(category, term);
    }

    public Post getPostDetails(int postId) {
        return mapper.getPostDetails(postId);
    }
}
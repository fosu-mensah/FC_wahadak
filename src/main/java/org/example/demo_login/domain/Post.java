package org.example.demo_login.domain;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;

/**
 * 게시물 정보를 담고 있는 도메인 클래스
 */
@Data
public class Post {
    private int id;  // 게시물 ID
    private String memberNickname;  // 작성자 닉네임
    private String category;  // 게시물 카테고리
    private String title;  // 게시물 제목
    private String content;  // 게시물 내용
    private LocalDateTime created_at;  // 게시물 생성일시
    private int like_count;  // 좋아요 수
    private String image_url;  // 이미지 URL
}

package org.example.demo_login.domain;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;

@Data
public class Post {
    private int id;
    private String memberNickname;
    private String category;
    private String title;
    private String content;
    private LocalDateTime created_at;
    private int like_count;
    private String image_url;
}

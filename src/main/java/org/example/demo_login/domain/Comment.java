package org.example.demo_login.domain;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Setter
@Getter
public class Comment {
    private int id;
    private int postId;
    private String memberNickname;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isDeleted;
    private int likeCount; // 좋아요 개수
    private boolean liked; // 좋아요 여부
    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", postId=" + postId +
                ", memberNickname='" + memberNickname + '\'' +
                ", content='" + content + '\'' +
                ", isDeleted=" + isDeleted +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", likeCount=" + likeCount +
                ", liked=" + liked +
                '}';
    }
}
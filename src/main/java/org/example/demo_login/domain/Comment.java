package org.example.demo_login.domain;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

/**
 * 댓글 정보를 담고 있는 도메인 클래스
 */
@Setter
@Getter
public class Comment {
    private int id;  // 댓글 ID
    private int postId;  // 게시물 ID (외래키)
    private String memberNickname;  // 작성자 닉네임
    private String content;  // 댓글 내용
    private LocalDateTime createdAt;  // 댓글 생성일시
    private LocalDateTime updatedAt;  // 댓글 수정일시
    private boolean isDeleted;  // 댓글 삭제 여부

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
                '}';
    }
}

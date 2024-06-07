package org.example.demo_login.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class Member {

    private int id;
    private String name;
    private String email;
    private String userPw;
    private String nickname;
    private String phone;
    private int age;
    private Role role = Role.USER; // 디폴트 역할 값이 USER 로 지정.

    public enum Role {
        ADMIN, USER
    }
}

package org.example.demo_login.domain;

import lombok.Data;

@Data
public class Member {

    private int id;
    private String name;
    private String email;
    private String userPw;
    private String nickname;
    private String phone;
    private int age;
    private Role role = Role.USER;
    private String provider;
    private String providerId;

    public enum Role {
        ADMIN, USER
    }

}
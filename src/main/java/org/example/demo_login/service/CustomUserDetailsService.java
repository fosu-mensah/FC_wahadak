package org.example.demo_login.service;

import org.example.demo_login.domain.Member;
import org.example.demo_login.Mapper.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String nickname) throws UsernameNotFoundException {
        Member member = memberRepository.findByUsername(nickname); // 닉네임으로 사용자 검색
        if (member == null) {
            throw new UsernameNotFoundException("User not found with nickname: " + nickname);
        }
        return new org.springframework.security.core.userdetails.User(member.getEmail(), member.getUserPw(), new ArrayList<>());
    }
}
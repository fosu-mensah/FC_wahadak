package org.example.demo_login.service;

import org.example.demo_login.domain.Member;
import org.example.demo_login.Mapper.MemberRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    public CustomOAuth2UserService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        if (email == null) {
            throw new IllegalArgumentException("Missing attribute 'email' in attributes");
        }

        String name = oAuth2User.getAttribute("name");
        String provider = userRequest.getClientRegistration().getRegistrationId();
        String providerId = oAuth2User.getAttribute("sub"); // Google의 경우 고유 사용자 ID는 'sub'입니다.

        Member member = memberRepository.findByEmail(email);
        if (member == null) {
            member = new Member();
            member.setEmail(email);
            member.setName(name);
            member.setNickname(generateUniqueNickname(name)); // 유니크한 닉네임 생성
            member.setPhone("N/A");
            member.setRole(Member.Role.USER);
            member.setProvider(provider);
            member.setProviderId(providerId);
            memberRepository.insert(member);
        }

        // 복사하여 수정 가능한 Map을 생성
        Map<String, Object> attributes = new HashMap<>(oAuth2User.getAttributes());
        attributes.put("nickname", member.getNickname());

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                attributes,
                "email");
    }

    private String generateUniqueNickname(String baseNickname) {
        String uniqueNickname = baseNickname;
        int counter = 1;
        while (memberRepository.findByNickname(uniqueNickname) != null) {
            uniqueNickname = baseNickname + counter;
            counter++;
        }
        return uniqueNickname;
    }
}
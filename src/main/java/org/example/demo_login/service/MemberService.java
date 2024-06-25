package org.example.demo_login.service;

import org.example.demo_login.Mapper.MemberRepository;
import org.example.demo_login.domain.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MemberService {
    @Autowired
    private final MemberRepository mapper;

    // 생성자 초기화
    public MemberService(MemberRepository mapper) {
        this.mapper = mapper;
    }

    public List<Member> select() {
        return mapper.selectAll();
    }

    public void insert(Member member) {
        mapper.insert(member);
    }

    /*서비스에 로그인 메서드 추가 */
    public Member login(String email, String password) {
        return mapper.login(email, password);
    }

    public Member findByUserName(String username) {
        return mapper.findByUsername(username);
    }

    // 사용자 역할 업데이트
    public void updateMemberRole(int id, Member.Role role) {
        mapper.updateRole(id, role.name());
    }

    // 전화번호 중복 확인용
    public Member findByPhone(String phone) {
        return mapper.findByPhone(phone);
    }

    // 공급자 ID로 사용자 조회
    public Member findByProviderId(String provider, String providerId) {
        return mapper.findByProviderId(provider, providerId);
    }

    public Member findByNickname(String nickname) {
        return mapper.findByNickname(nickname);
    }

    public void registerOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        String provider = userRequest.getClientRegistration().getRegistrationId();
        String providerId = oAuth2User.getName();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        String uniqueName = generateUniqueUserName(name);
        String uniqueNickname = generateUniqueNickname(name); // 닉네임 생성 함수 호출

        Member existingMember = mapper.findByProviderId(provider, providerId);
        if (existingMember == null) {
            Member newMember = new Member();
            newMember.setEmail(email);
            newMember.setName(uniqueName);
            newMember.setNickname(uniqueNickname);  // 고유한 닉네임 설정
            newMember.setProvider(provider);
            newMember.setProviderId(providerId);
            newMember.setRole(Member.Role.USER); // Default role
            newMember.setPhone("N/A");

            mapper.insert(newMember);
        }
    }

    private String generateUniqueNickname(String baseNickname) {
        int suffix = 1;
        String newNickname = baseNickname;
        while (findByNickname(newNickname) != null) { // 기존 닉네임과 중복되는지 확인
            newNickname = baseNickname + suffix;  // 접미사를 더하여 새 닉네임 생성
            suffix++;
        }
        return newNickname;  // 중복되지 않는 닉네임 반환
    }

    private String generateUniqueUserName(String baseName) {
        int suffix = 1;
        String newName = baseName;
        while (findByUserName(newName) != null) { // 기존 이름과 중복되는지 확인
            newName = baseName + suffix;  // 접미사를 더하여 새 이름 생성
            suffix++;
        }
        return newName;  // 중복되지 않는 이름 반환
    }

    // 이메일로 사용자 조회 메서드 추가
    public Member findByEmail(String email) {
        return mapper.findByEmail(email);
    }
}

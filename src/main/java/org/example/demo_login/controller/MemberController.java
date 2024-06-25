package org.example.demo_login.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.example.demo_login.domain.Member;
import org.example.demo_login.service.MemberService;
import org.example.demo_login.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.access.prepost.PreAuthorize;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000", "http://www.fcwahadak.com"})
@RestController
@RequestMapping("/api/members")
public class MemberController {
    private final JwtUtil jwtUtil;
    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService, JwtUtil jwtUtil) {
        this.memberService = memberService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<List<Member>> getSelectList() {
        List<Member> result = memberService.select();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insertDemoVo(@RequestBody Member member) {
        if (member.getRole() == null) {
            member.setRole(Member.Role.USER);
        }
        Member existingMember = memberService.findByPhone(member.getPhone());
        if (existingMember != null) {
            return new ResponseEntity<>("Phone number already exists", HttpStatus.BAD_REQUEST);
        }
        memberService.insert(member);
        return new ResponseEntity<>("Data inserted successfully", HttpStatus.OK);
    }

    // 기존의 일반 로그인 메서드
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Member loggedInMember = memberService.login(email, password);
        if (loggedInMember != null) {
            String token = jwtUtil.generateToken(loggedInMember.getEmail(), loggedInMember.getNickname());
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("nickname", loggedInMember.getNickname());
            responseData.put("member", loggedInMember);
            responseData.put("token", token);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/login/google")
    public ResponseEntity<Map<String, Object>> googleLogin(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String nickname = loginRequest.get("nickname");

        Member loggedInMember = memberService.findByEmail(email);
        if (loggedInMember != null) {
            String token = jwtUtil.generateToken(loggedInMember.getEmail(), loggedInMember.getNickname());
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("nickname", loggedInMember.getNickname());
            responseData.put("member", loggedInMember);
            responseData.put("token", token);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "로그아웃 성공!");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/userinfo")
    public ResponseEntity<Member> getUserInfo(@RequestHeader("Authorization") String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.getEmailFromToken(token); // 이메일을 추출
                System.out.println("Extracted email: " + email); // 로그 추가
                Member loggedInMember = memberService.findByEmail(email); // 이메일로 회원 조회
                System.out.println("Found member: " + loggedInMember); // 로그 추가
                if (loggedInMember != null) {
                    return new ResponseEntity<>(loggedInMember, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            e.printStackTrace();  // 서버 로그에 예외를 출력
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 멤버 권한을 바꿔주는 컨트롤러.
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/role/admin")
    public ResponseEntity<String> setAdminRole(@PathVariable int id) {
        memberService.updateMemberRole(id, Member.Role.ADMIN);
        return new ResponseEntity<>("Role updated to ADMIN", HttpStatus.OK);
    }
}

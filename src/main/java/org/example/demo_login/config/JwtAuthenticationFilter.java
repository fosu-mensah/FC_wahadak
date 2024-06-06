package org.example.demo_login.config;

import org.example.demo_login.util.JwtUtil;
import org.example.demo_login.service.CustomUserDetailsService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;


// Spring Security의 필터 체인에서 JWT 기반의 인증을 처리하는 필터.
// 요청을 가로채서 JWT 토큰을 검증하고 검증이 성공하면 해당 사용자를 인증된 사용자로 설정.
public class JwtAuthenticationFilter extends OncePerRequestFilter { // 한 요청 당 한 번만 필터를 적용.

    // JWT 토큰의 생성 및 검증을 담당하는 유틸리티 클래스.
    private final JwtUtil jwtUtil;
    // 사용자 세부 정보를 로드하는 서비스 클래스.
    private final CustomUserDetailsService customUserDetailsService;

    // 필드 초기화 생성자.
    public JwtAuthenticationFilter(JwtUtil jwtUtil, CustomUserDetailsService customUserDetailsService) {
        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = customUserDetailsService;
    }


    // doFilter 메서드 : 필터 체인 내에서 필터링 작업을 수행.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = getTokenFromRequest(request);    // 요청 헤더에서 JWT 토큰 추출.
        if (token != null && jwtUtil.validateToken(token)) {  // JWT 토큰의 유효성을 검사.
            String username = jwtUtil.getUsernameFromToken(token);  // 유효한 토큰에서 사용자 이름을 추출.
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);  // 사용자 이름을 기반으로 사용자 세부 정보를 로드.
            if (userDetails != null) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        filterChain.doFilter(request, response);
    }

    private String getTokenFromRequest(HttpServletRequest request) {    // 요청 헤더에서 JWT 토큰을 추출하는 유틸리티 메서드.
        String bearerToken = request.getHeader("Authorization"); // Authorization 헤더에서 토큰을 가져온다.
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}

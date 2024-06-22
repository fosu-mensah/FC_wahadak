package org.example.demo_login.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    private String secretKey;

    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 1일

    private Key key;

    public JwtUtil(@Value("${JWT_SECRET_KEY}") String secretKey) {
        this.secretKey = secretKey;
        byte[] keyBytes = Base64.getUrlDecoder().decode(this.secretKey); // URL-safe Base64 디코딩
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // 토큰을 생성하는 메서드
    public String generateToken(String subject) {
        System.out.println("Generating token for subject: " + subject);
        Date now = new Date();
        Date expiration = new Date(now.getTime() + EXPIRATION_TIME);

        String token = Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(this.key)
                .compact();
        System.out.println("Generated token: " + token);
        return token;
    }

    // 토큰 파싱
    public String getUsernameFromToken(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두어 제거
        }
        return Jwts.parserBuilder()
                .setSigningKey(this.key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // 토큰 검증
    public boolean validateToken(String token) {
        try {
            System.out.println("Validating token: " + token);
            if (token.startsWith("Bearer ")) {
                token = token.substring(7); // "Bearer " 접두어 제거
            }
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(this.key)
                    .build()
                    .parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (io.jsonwebtoken.JwtException | IllegalArgumentException e) {
            System.out.println("Invalid JWT token: " + e.getMessage());
            return false;
        }
    }
}
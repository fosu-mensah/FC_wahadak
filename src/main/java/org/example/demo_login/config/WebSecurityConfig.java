package org.example.demo_login.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.demo_login.util.JwtUtil;
import org.example.demo_login.service.CustomUserDetailsService;
import org.example.demo_login.filter.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;


import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;

    public WebSecurityConfig(JwtUtil jwtUtil, CustomUserDetailsService customUserDetailsService) {
        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtUtil, customUserDetailsService);

        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/api-test-swagger").permitAll() // Swaager 관련 End Point
                                .requestMatchers("/api/news/**").permitAll() // 뉴스 관련 End Point
                                .requestMatchers("/api/events/**").permitAll() // 이벤트 관련 End Point
                                .requestMatchers("/", "/error", "/api/members/login", "/api/members/insert", "/players/search/**").permitAll()
                                .requestMatchers("/api/members/userinfo").authenticated()
                                .anyRequest().authenticated()
                )
                .logout(logout -> logout
                        .logoutUrl("/api/members/logout")
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setStatus(HttpStatus.OK.value());
                            Map<String, String> responseBody = new HashMap<>();
                            responseBody.put("message", "로그아웃 성공!");
                            response.getWriter().write(new ObjectMapper().writeValueAsString(responseBody));
                        })
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    public void configure(WebSecurity web) throws Exception {
        web.httpFirewall(allowUrlEncodedPercentHttpFirewall());
    }

    @Bean
    public HttpFirewall allowUrlEncodedPercentHttpFirewall() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowUrlEncodedPercent(true); // URL에 % 문자를 허용
        firewall.setAllowUrlEncodedSlash(true); // URL에 / 문자를 허용
        firewall.setAllowSemicolon(true); // URL에 세미콜론(;) 문자를 허용
        firewall.setAllowUrlEncodedDoubleSlash(true); // URL에 이중 슬래시(//) 허용
        firewall.setAllowBackSlash(true); // URL에 백슬래시(\) 허용
        firewall.setAllowUrlEncodedPeriod(true); // URL에 마침표(.) 허용
        firewall.setAllowNull(true); // URL에 null 문자 허용
        firewall.setAllowUrlEncodedCarriageReturn(true); // URL에 캐리지 리턴 허용
        firewall.setAllowUrlEncodedLineFeed(true); // URL에 줄 바꿈 문자 허용
        firewall.setAllowUrlEncodedParagraphSeparator(true); // URL에 문단 구분자 허용
        firewall.setAllowUrlEncodedLineSeparator(true); // URL에 줄 구분자 허용
        return firewall;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000"); // 허용할 도메인 설정
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return customUserDetailsService;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
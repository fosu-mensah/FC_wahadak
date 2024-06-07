package org.example.demo_login.config;

import org.example.demo_login.service.CustomOAuth2UserService;
import org.example.demo_login.service.CustomUserDetailsService;
import org.example.demo_login.util.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;
    private final CustomOAuth2UserService customOAuth2UserService;

    public WebSecurityConfig(JwtUtil jwtUtil,
                             CustomUserDetailsService customUserDetailsService,
                             CustomOAuth2UserService customOAuth2UserService) {
        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = customUserDetailsService;
        this.customOAuth2UserService = customOAuth2UserService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtUtil, customUserDetailsService);

        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/","/oauth2/**", "/login", "/error", "/api/members/oauth2/loginSuccess").permitAll()
                                .requestMatchers("/api/members/userinfo").authenticated()
                                .anyRequest().permitAll()
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
package org.example.demo_login.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://ec2-3-139-91-37.us-east-2.compute.amazonaws.com",
                        "http://localhost:3000", //개발환경 테스트를 위해 유지.
                        "http://www.fcwahadak.com"
                )
                .allowedMethods("GET","POST","PUT","DELETE")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    //클라이언트에 이미지가 나오도록 CORS 정책설정과 이미지 파일 경로 설정.
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:/home/ec2-user/FC_waha/step1/FC_wahadak/src/main/resources/static/images/");
    }

    //RestTemplate 빈을 설정하고 주입받도록 코드를 약간 더 개선
    //RestTemplate이 Spring의 의존성 주입을 통해 관리되며, 테스트 가능성 up, 코두 유지 보수성 up.
    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}

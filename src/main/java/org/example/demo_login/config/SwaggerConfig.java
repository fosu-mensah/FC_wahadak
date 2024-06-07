package org.example.demo_login.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        String jwt = "JWT";

        // SecurityRequirement 객체는 API 문서에서 사용하는 보안 스키마를 정의합니다.
        SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwt);

        // Components 객체는 보안 스키마 및 기타 API 구성 요소를 정의합니다.
        Components components = new Components().addSecuritySchemes(jwt, new SecurityScheme()
                .name(jwt)
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
        );

        // OpenAPI 객체를 반환합니다. 이 객체는 API 문서의 전반적인 구성을 정의합니다.
        return new OpenAPI()
                .components(new Components())  // 빈 Components 객체를 추가합니다.
                .info(apiInfo())  // API 정보(제목, 설명, 버전)를 설정합니다.
                .addSecurityItem(securityRequirement)  // 보안 요구 사항을 추가합니다.
                .components(components);  // 구성 요소(보안 스키마 등)를 추가합니다.
    }

    private Info apiInfo() {
        // Info 객체는 API 문서의 제목, 설명 및 버전을 정의합니다.
        return new Info()
                .title("FC wahadak API Test")  // API 문서의 제목을 설정합니다.
                .description("FC wahadak Swagger")  // API 문서에 대한 설명을 설정합니다.
                .version("1.0.0");  // API 문서의 버전을 설정합니다.
    }
}
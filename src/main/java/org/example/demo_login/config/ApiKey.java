package org.example.demo_login.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class ApiKey {
    @Value("${api-key}")
    private String key;
}

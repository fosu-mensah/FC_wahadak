package org.example.demo_login;

import io.github.cdimascio.dotenv.Dotenv;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("org.example.demo_login.Mapper")

public class DemoLoginApplication {
    public static void main(String[] args) {
	Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
	dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

        SpringApplication.run(DemoLoginApplication.class, args);
    }
}

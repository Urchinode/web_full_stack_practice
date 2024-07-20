package com.server.todo.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Controller 단위 CORS
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedOrigins("http:localhost:8080", "http:localhost:5173")
                .allowedMethods("HEAD", "GET", "POST", "OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("Authorization") // 클라이언트가 접근 가능한 헤더
                .allowCredentials(true);
    }
}

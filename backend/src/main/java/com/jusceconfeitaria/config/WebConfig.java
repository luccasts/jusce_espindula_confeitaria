package com.jusceconfeitaria.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permite que seu frontend acesse qualquer rota do backend
        registry.addMapping("/**")
                .allowedOrigins("*") // Em produção, você trocaria o "*" pela URL do site
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
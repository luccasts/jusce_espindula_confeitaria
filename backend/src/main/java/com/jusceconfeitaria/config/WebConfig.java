package com.jusceconfeitaria.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  // app.cors.allowed-origin=https://www.jusceconfeitaria.com.br

  @Value("${app.cors.allowed-origin:http://localhost:3000}")
  private String allowedOrigin;

  @Override
  public void addCorsMappings(CorsRegistry registry) {

    registry
        .addMapping("/**")
        .allowedOrigins(allowedOrigin) // domínio exato
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(true)
        .maxAge(3600);
  }
}

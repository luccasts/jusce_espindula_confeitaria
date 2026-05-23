package com.jusceconfeitaria;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class JusceBackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(JusceBackendApplication.class, args);
  }
}

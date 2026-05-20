package com.jusceconfeitaria.config;

import com.jusceconfeitaria.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final JwtAuthFilter jwtAuthFilter;

  public SecurityConfig(JwtAuthFilter filter) {

    this.jwtAuthFilter = filter;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    http.csrf(csrf -> csrf.disable())
        .cors(cors -> {}) // usa o WebConfig.java
        .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(
            auth ->
                auth

                    // Rotas públicas

                    .requestMatchers(HttpMethod.GET, "/api/produtos")
                    .permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/produtos/**")
                    .permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/categorias")
                    .permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/categorias/**")
                    .permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/tamanhos")
                    .permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/grupos-opcoes/**")
                    .permitAll()
                    .requestMatchers(HttpMethod.POST, "/api/pedidos")
                    .permitAll()
                    .requestMatchers(HttpMethod.POST, "/api/pedidos/log")
                    .permitAll()
                    .requestMatchers("/api/auth/**")
                    .permitAll()
                    .requestMatchers("/uploads/**")
                    .permitAll()

                    // Rotas protegidas — requerem JWT

                    .requestMatchers(HttpMethod.POST, "/api/produtos")
                    .authenticated()
                    .requestMatchers(HttpMethod.PUT, "/api/produtos/**")
                    .authenticated()
                    .requestMatchers(HttpMethod.DELETE, "/api/produtos/**")
                    .authenticated()
                    .requestMatchers("/api/categorias/**")
                    .authenticated()
                    .requestMatchers(HttpMethod.GET, "/api/pedidos")
                    .authenticated()
                    .requestMatchers(HttpMethod.PUT, "/api/pedidos/**")
                    .authenticated()
                    .anyRequest()
                    .authenticated())
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {

    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
      throws Exception {

    return config.getAuthenticationManager();
  }
}

package com.jusceconfeitaria.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

  @Value("${app.jwt.secret}")
  private String secret;

  @Value("${app.jwt.expiration-ms}")
  private long expirationMs;

  private SecretKey getKey() {

    return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
  }

  public String gerarToken(String email) {

    return Jwts.builder()
        .subject(email)
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + expirationMs))
        .signWith(getKey())
        .compact();
  }

  public String extrairEmail(String token) {

    return Jwts.parser()
        .verifyWith(getKey())
        .build()
        .parseSignedClaims(token)
        .getPayload()
        .getSubject();
  }

  public boolean validarToken(String token) {

    try {

      Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token);

      return true;

    } catch (JwtException | IllegalArgumentException e) {

      return false;
    }
  }
}

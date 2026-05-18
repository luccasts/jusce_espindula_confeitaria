package com.jusceconfeitaria.controller;

import com.jusceconfeitaria.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthenticationManager authManager;

  private final JwtUtil jwtUtil;

  public AuthController(AuthenticationManager am, JwtUtil jwt) {

    this.authManager = am;

    this.jwtUtil = jwt;
  }

  public record LoginRequest(String email, String senha) {}

  public record LoginResponse(String token, String email) {}

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest req) {

    try {

      authManager.authenticate(new UsernamePasswordAuthenticationToken(req.email(), req.senha()));

      String token = jwtUtil.gerarToken(req.email());

      return ResponseEntity.ok(new LoginResponse(token, req.email()));

    } catch (AuthenticationException e) {

      return ResponseEntity.status(401).build();
    }
  }
}

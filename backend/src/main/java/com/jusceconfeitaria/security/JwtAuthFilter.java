package com.jusceconfeitaria.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtUtil jwtUtil;

  private final UserDetailsServiceImpl userDetailsService;

  public JwtAuthFilter(JwtUtil jwtUtil, UserDetailsServiceImpl uds) {

    this.jwtUtil = jwtUtil;

    this.userDetailsService = uds;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest req, HttpServletResponse res, FilterChain chain)
      throws ServletException, IOException {

    String header = req.getHeader("Authorization");

    if (header != null && header.startsWith("Bearer ")) {

      String token = header.substring(7);

      if (jwtUtil.validarToken(token)) {

        String email = jwtUtil.extrairEmail(token);

        UserDetails ud = userDetailsService.loadUserByUsername(email);

        UsernamePasswordAuthenticationToken auth =
            new UsernamePasswordAuthenticationToken(ud, null, ud.getAuthorities());

        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));

        SecurityContextHolder.getContext().setAuthentication(auth);
      }
    }

    chain.doFilter(req, res);
  }
}

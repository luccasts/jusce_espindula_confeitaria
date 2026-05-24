package com.jusceconfeitaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

  @RequestMapping(
      value = "/api/health",
      method = {RequestMethod.GET, RequestMethod.HEAD})
  public ResponseEntity<String> health() {
    return ResponseEntity.ok("ok");
  }
}

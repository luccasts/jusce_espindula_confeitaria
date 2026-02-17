package com.jusceconfeitaria.controller;

import java.util.Collections;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TesteController {
  @GetMapping("/ola")
  public Map<String, String> ola() {
    return Collections.singletonMap(
        "mensagem", "O BACKEND ESSA PORRA TA LIGADO FILHA DA PUTAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!");
  }
}

package com.jusceconfeitaria.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.Collections;

@RestController
@RequestMapping("/api")
public class TesteController {
    @GetMapping("/ola")
    public Map<String, String> ola() {
        return Collections.singletonMap("OLHA A MENSAGEM!!!", "Conexão com o Backend da Jusce Confeiteira Feita com Sucesso!");
    }
    
}

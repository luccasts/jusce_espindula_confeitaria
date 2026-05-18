package com.jusceconfeitaria.exceptions;

import java.time.LocalDateTime;

public record ErrorResponse(
    int status, String erro, String mensagem, String caminho, LocalDateTime timestamp) {}

package com.jusceconfeitaria.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.stream.Collectors;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@RestControllerAdvice
public class GlobalExceptionHandler {

  // 404 — Recurso não encontrado

  @ExceptionHandler(RecursoNaoEncontradoException.class)
  public ResponseEntity<ErrorResponse> handleNotFound(
      RecursoNaoEncontradoException ex, HttpServletRequest req) {

    return build(HttpStatus.NOT_FOUND, "Não Encontrado", ex.getMessage(), req.getRequestURI());
  }

  // 400 — Argumento inválido (validação manual)

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ErrorResponse> handleBadRequest(
      IllegalArgumentException ex, HttpServletRequest req) {

    return build(
        HttpStatus.BAD_REQUEST, "Requisição Inválida", ex.getMessage(), req.getRequestURI());
  }

  // 400 — Tipo de parâmetro de path/query inválido
  // Ex: GET /api/categorias/abc → "Parâmetro 'id' inválido: 'abc' não é um valor aceitável."

  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public ResponseEntity<ErrorResponse> handleTypeMismatch(
      MethodArgumentTypeMismatchException ex, HttpServletRequest req) {

    Object rawValue = ex.getValue();
    String valorInvalido = (rawValue != null) ? String.valueOf(rawValue) : "null";
    String mensagem =
        String.format(
            "Parâmetro '%s' inválido: '%s' não é um valor aceitável.", ex.getName(), valorInvalido);

    return build(HttpStatus.BAD_REQUEST, "Parâmetro Inválido", mensagem, req.getRequestURI());
  }

  // 400 — Validação de @Valid / @NotBlank etc.

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleValidation(
      MethodArgumentNotValidException ex, HttpServletRequest req) {

    String msg =
        ex.getBindingResult().getAllErrors().stream()
            .map(e -> e.getDefaultMessage())
            .collect(Collectors.joining("; "));

    return build(HttpStatus.BAD_REQUEST, "Validação", msg, req.getRequestURI());
  }

  // 413 — Arquivo muito grande

  @ExceptionHandler(MaxUploadSizeExceededException.class)
  public ResponseEntity<ErrorResponse> handleFileTooLarge(
      MaxUploadSizeExceededException ex, HttpServletRequest req) {

    return build(
        HttpStatus.PAYLOAD_TOO_LARGE,
        "Arquivo Muito Grande",
        "O arquivo enviado excede o tamanho máximo permitido (10MB).",
        req.getRequestURI());
  }

  // 401 — Não autenticado

  @ExceptionHandler(org.springframework.security.core.AuthenticationException.class)
  public ResponseEntity<ErrorResponse> handleUnauthorized(
      org.springframework.security.core.AuthenticationException ex, HttpServletRequest req) {

    return build(
        HttpStatus.UNAUTHORIZED,
        "Não Autorizado",
        "Credenciais inválidas ou token expirado.",
        req.getRequestURI());
  }

  // 500 — Erro genérico (catch-all, deve ficar por último)

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleGeneric(Exception ex, HttpServletRequest req) {

    return build(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Erro Interno",
        "Ocorreu um erro inesperado. Tente novamente.",
        req.getRequestURI());
  }

  // ================= HELPER =================

  private ResponseEntity<ErrorResponse> build(
      HttpStatus status, String erro, String mensagem, String caminho) {

    return ResponseEntity.status(status)
        .body(new ErrorResponse(status.value(), erro, mensagem, caminho, LocalDateTime.now()));
  }
}

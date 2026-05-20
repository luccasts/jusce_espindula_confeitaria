package com.jusceconfeitaria.service;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

  @Value("${app.upload.dir:uploads}")
  private String uploadDir;

  public String salvar(MultipartFile file) {

    try {

      Path dir = Paths.get(uploadDir).toAbsolutePath().normalize();

      Files.createDirectories(dir);

      String ext = obterExtensao(file.getOriginalFilename());

      String nomeArquivo = UUID.randomUUID() + ext;

      Path destino = dir.resolve(nomeArquivo);

      Files.copy(file.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);

      // Retorna caminho relativo para gravar no banco

      return "/uploads/" + nomeArquivo;

    } catch (IOException e) {

      throw new RuntimeException("Falha ao salvar arquivo: " + e.getMessage(), e);
    }
  }

  private String obterExtensao(String nomeOriginal) {

    if (nomeOriginal == null || !nomeOriginal.contains(".")) return ".jpg";

    return nomeOriginal.substring(nomeOriginal.lastIndexOf('.'));
  }
}

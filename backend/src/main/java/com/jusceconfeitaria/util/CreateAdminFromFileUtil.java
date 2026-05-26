package com.jusceconfeitaria.util;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.Map;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class CreateAdminFromFileUtil {

  // Configurações do seu banco extraídas do seu application.properties
  private static final String URL =
      "jdbc:mysql://localhost:3306/jusce_espindula?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
  private static final String USER = "root";
  private static final String PASSWORD = "admin";
  private static final String CONFIG_FILE = "admin-config.txt";

  public static void main(String[] args) {
    Map<String, String> config = carregarConfiguracao();

    String email = config.get("email");
    String senhaLimpa = config.get("senha");
    String nome = config.get("nome");

    if (email == null || senhaLimpa == null || nome == null) {
      System.err.println(
          "❌ Erro: O arquivo "
              + CONFIG_FILE
              + " não contém todas as propriedades (email, senha, nome).");
      return;
    }

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    // O próprio Java faz a putaria do hash de forma silenciosa por trás dos panos
    String hashGerado = encoder.encode(senhaLimpa);

    String sqlRole =
        "INSERT INTO roles (id, name) VALUES (1, 'ADMIN') ON DUPLICATE KEY UPDATE name='ADMIN'";
    String sqlUser =
        "INSERT INTO users (role_id, name, email, password_hash, is_active, created_at) VALUES (1,"
            + " ?, ?, ?, TRUE, NOW())";

    try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {
      conn.setAutoCommit(false);

      // 1. Garante a Role ADMIN
      try (PreparedStatement stmtRole = conn.prepareStatement(sqlRole)) {
        stmtRole.executeUpdate();
      }

      // 2. Insere o Usuário aplicando o BCrypt da senha do arquivo
      try (PreparedStatement stmtUser = conn.prepareStatement(sqlUser)) {
        stmtUser.setString(1, nome);
        stmtUser.setString(2, email);
        stmtUser.setString(3, hashGerado);
        stmtUser.executeUpdate();
      }

      conn.commit();
      System.out.println(
          "✅ Administrador criado com sucesso a partir do arquivo " + CONFIG_FILE + "!");

    } catch (Exception e) {
      System.err.println("❌ Erro ao interagir com o banco de dados: " + e.getMessage());
    }
  }

  private static Map<String, String> carregarConfiguracao() {
    Map<String, String> mapa = new HashMap<>();
    try (BufferedReader br = new BufferedReader(new FileReader(CONFIG_FILE))) {
      String linha;
      while ((linha = br.readLine()) != null) {
        if (linha.contains("=")) {
          String[] partes = linha.split("=", 2);
          mapa.put(partes[0].trim(), partes[1].trim());
        }
      }
    } catch (IOException e) {
      System.err.println(
          "❌ Erro ao ler o arquivo "
              + CONFIG_FILE
              + ". Certifique-se de que ele existe na raiz do projeto.");
    }
    return mapa;
  }
}

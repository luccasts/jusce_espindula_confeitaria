package com.jusceconfeitaria.config;

import javax.sql.DataSource;
import org.flywaydb.core.Flyway;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FlywayConfig {

  @Bean(initMethod = "migrate")
  public Flyway flyway(DataSource dataSource) {
    return Flyway.configure()
        .dataSource(dataSource)
        .locations("classpath:db/migrations")
        .baselineOnMigrate(true)
        .baselineVersion("1")
        .outOfOrder(true)
        .validateOnMigrate(false)
        .schemas("jusce_espindula")
        .load();
  }
}

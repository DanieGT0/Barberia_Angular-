package com.barberia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BarberiaApplication {

    public static void main(String[] args) {
        SpringApplication.run(BarberiaApplication.class, args);
    }
}
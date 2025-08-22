package com.example.claimsmanagement.config;

import com.example.claimsmanagement.model.Claim;
import com.example.claimsmanagement.repository.ClaimRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(ClaimRepository repository) {
        return args -> {
            repository.saveAll(Arrays.asList(
                    new Claim(null, "John Doe", new BigDecimal("1200.50"), LocalDate.of(2023, 1, 15), "Approved"),
                    new Claim(null, "Jane Smith", new BigDecimal("500.00"), LocalDate.of(2023, 2, 20), "Pending"),
                    new Claim(null, "Peter Jones", new BigDecimal("7500.00"), LocalDate.of(2023, 3, 10), "Rejected"),
                    new Claim(null, "Mary Williams", new BigDecimal("300.75"), LocalDate.of(2023, 4, 5), "Approved"),
                    new Claim(null, "David Brown", new BigDecimal("2500.00"), LocalDate.of(2023, 5, 1), "Pending")
            ));
        };
    }
}

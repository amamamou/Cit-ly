package com.example.citely.repository;

import com.example.citely.entity.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
    // Add custom queries if needed, e.g., findByAuthor or findByCategory
}
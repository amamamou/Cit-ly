package com.example.citely.service;

import com.example.citely.entity.Quote;
import com.example.citely.repository.QuoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuoteService {

    @Autowired
    private QuoteRepository quoteRepository;

    // Save a quote
    public Quote saveQuote(Quote quote) {
        return quoteRepository.save(quote);
    }

    // Get all quotes
    public List<Quote> getAllQuotes() {
        return quoteRepository.findAll();
    }

    // Get a quote by ID
    public Optional<Quote> getQuoteById(Long id) {
        return quoteRepository.findById(id);
    }

    // Delete a quote by ID
    public void deleteQuoteById(Long id) {
        quoteRepository.deleteById(id);
    }
}
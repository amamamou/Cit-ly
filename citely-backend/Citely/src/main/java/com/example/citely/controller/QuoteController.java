package com.example.citely.controller;


import com.example.citely.entity.Quote;
import com.example.citely.service.QuoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quotes")
public class QuoteController {

    @Autowired
    private QuoteService quoteService;

    // Get all quotes
    @GetMapping
    public List<Quote> getAllQuotes() {
        return quoteService.getAllQuotes();
    }

    // Get a quote by ID
    @GetMapping("/{id}")
    public Quote getQuoteById(@PathVariable Long id) {
        return quoteService.getQuoteById(id)
                .orElseThrow(() -> new RuntimeException("Quote not found with ID: " + id));
    }

    // Save a new quote
    @PostMapping
    public Quote saveQuote(@RequestBody Quote quote) {
        return quoteService.saveQuote(quote);
    }

    // Delete a quote by ID
    @DeleteMapping("/{id}")
    public void deleteQuote(@PathVariable Long id) {
        quoteService.deleteQuoteById(id);
    }
}

package com.example.citely.controller;

import com.example.citely.entity.Quote;
import com.example.citely.service.ExternalQuoteService;
import com.example.citely.service.QuoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/quotes")
@CrossOrigin(origins = "http://localhost:4200")  // Allow requests from Angular app

public class QuoteController {

    @Autowired
    private QuoteService quoteService;

    @Autowired
    private ExternalQuoteService externalQuoteService;

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

    // Fetch a random inspirational quote
    @GetMapping("/random")
    public String getRandomQuote() {
        return externalQuoteService.fetchRandomQuote();
    }

    // Get authors and their quote counts
    @GetMapping("/authors")
    public Map<String, Integer> getAuthorsWithQuoteCount() {
        return externalQuoteService.getAuthorsWithQuoteCount();
    }
}

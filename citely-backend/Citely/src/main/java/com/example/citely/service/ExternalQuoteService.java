package com.example.citely.service;


import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ExternalQuoteService {

    private final String EXTERNAL_API_URL = "https://api.quotable.io/random?tags=inspirational";

    public String fetchRandomQuote() {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(EXTERNAL_API_URL, String.class);
    }
}
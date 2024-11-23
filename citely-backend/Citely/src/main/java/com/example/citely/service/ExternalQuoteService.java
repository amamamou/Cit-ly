package com.example.citely.service;


import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;



import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@Service
public class ExternalQuoteService {

    private final String EXTERNAL_API_URL = "https://api.quotable.io";
    private final Map<String, Integer> authorQuoteCount = new HashMap<>();

    public String fetchRandomQuote() {
        RestTemplate restTemplate = new RestTemplate();
        String quoteJson = restTemplate.getForObject(EXTERNAL_API_URL, String.class);

        // Parse the response and increment the count of the respective author
        String author = parseAuthorFromJson(quoteJson);
        if (author != null) {
            authorQuoteCount.put(author, authorQuoteCount.getOrDefault(author, 0) + 1);
        }

        return quoteJson; // Return the quote as a JSON string
    }

    private String parseAuthorFromJson(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(json);
            JsonNode authorNode = root.path("author");
            return authorNode.asText();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Endpoint to get the authors and their quote counts
    public Map<String, Integer> getAuthorsWithQuoteCount() {
        return authorQuoteCount;
    }
}

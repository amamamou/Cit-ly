import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quotes: { content: string; author: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchQuotes();
  }

  fetchQuotes(): void {
    this.http.get<any>('https://api.quotable.io/quotes').subscribe(
      (response) => {
        this.quotes = response.results;
      },
      (error) => {
        console.error('Error fetching quotes:', error);
      }
    );
  }
}

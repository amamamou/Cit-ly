import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {
  author: any = null;
  citations: any[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  // Declare a mapping for authors and their images
  authorImages: { [key: string]: string } = {
    '14th Dalai Lama': 'assets/authors/0.jpg',
    'A. A. Milne': 'assets/authors/AA.jpg',
    'A. P. J. Abdul Kalam': 'assets/authors/K.jpg',
    'A. Powell Davies': 'assets/authors/P.jpg',
    'Abigail Adams': 'assets/authors/Abigail.jpg',
    'Abraham Lincoln': 'assets/authors/L.jpg',
    'Abraham Maslow': 'assets/authors/Abraham.jpg',
    'Adam Smith': 'assets/authors/Smith.jpg',
    'Aeschylus': 'assets/authors/Aeschylus.jpg',
    'Aesop': 'assets/authors/A.jpg',
    'Afrika Bambaataa': 'assets/authors/Afrika.jpg',
    'Agatha Christie': 'assets/authors/Agatha.jpg',
    'Akhenaten': 'assets/authors/Akhenaten.jpg',
    'Alan Cohen': 'assets/authors/Leonard.jpg',
    'Alan Watts': 'assets/authors/Watts.jpg',
    'Albert Camus': 'assets/authors/C.jpg',
    'Albert Einstein': 'assets/authors/ETH.jpg',
    'Albert Schweitzer': 'assets/authors/Schweitzer.jpg',
    'Aldous Huxley': 'assets/authors/Huxley.jpg',
    'Alexander Chalmers': 'assets/authors/Alexander.jpg',
    // Add more mappings as needed
  };

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const authorId = this.route.snapshot.paramMap.get('id'); // Retrieve the dynamic ID
    if (authorId) {
      this.getAuthorDetails(authorId);
    }
  }

  getAuthorDetails(authorId: string): void {
    this.isLoading = true;

    // Fetch the author's details
    this.http.get(`https://api.quotable.io/authors/${authorId}`)
      .subscribe({
        next: (data) => {
          this.author = data;
          this.getCitations(authorId); // Fetch citations once the author details are available
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Unable to fetch author details. Please try again later.';
          console.error(error);
        },
      });
  }

  getCitations(authorId: string): void {
    // Fetch the author's citations
    this.http.get<{ results: any[] }>(`https://api.quotable.io/quotes?authorId=${authorId}`)
      .subscribe({
        next: (data) => {
          this.isLoading = false;
          this.citations = data.results;
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Unable to fetch author citations.';
          console.error(error);
        },
      });
  }

  getAuthorImage(name: string): string {
    return this.authorImages[name] || 'assets/authors/default.jpg'; // Provide a default image if no mapping exists
  }
  
}

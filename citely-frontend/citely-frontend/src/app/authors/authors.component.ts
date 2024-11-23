import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  // Declare an array to store the authors' data and their images
  authors: { name: string, bio: string, image: string, quoteCount: number }[] = [];

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAuthors();
  }

  // Fetch authors from the Quotable API
  getAuthors(): void {
    this.http.get<{ results: { name: string, bio: string, quoteCount: number }[] }>('https://api.quotable.io/authors')
      .subscribe((data) => {
        if (data && data.results) {
          // Map the data and associate authors with their images
          this.authors = data.results.map((author) => ({
            name: author.name,
            bio: author.bio,
            image: this.authorImages[author.name] || 'assets/images/default_author.jpg', // Default image if no match
            quoteCount: author.quoteCount
          }));
        } else {
          console.error('Unexpected data structure:', data);
        }
      }, (error) => {
        console.error('Error fetching authors:', error);
      });
  }
}

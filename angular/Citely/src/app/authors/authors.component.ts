import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: { id: string, name: string, bio: string, image: string, quoteCount: number }[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  selectedSort: string = 'name';

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
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getAuthors();
  }

  viewAuthorDetails(authorId: string): void {
    this.router.navigate(['/author', authorId]);
  }

  getAuthors(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.http.get<{ results: { _id: string, name: string, bio: string, quoteCount: number }[] }>('https://api.quotable.io/authors')
      .subscribe({
        next: (data) => {
          this.isLoading = false;
          if (data && data.results) {
            this.authors = data.results.map((author) => ({
              id: author._id, // Use the correct author ID
              name: author.name,
              bio: author.bio,
              image: this.authorImages[author.name] || 'assets/images/default_author.jpg',
              quoteCount: author.quoteCount,
            }));
            this.sortAuthors(); // Sort by default option
          } else {
            this.errorMessage = 'Les données retournées ne sont pas dans le format attendu.';
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Erreur lors de la récupération des auteurs :', error);
          this.errorMessage = 'Impossible de charger les auteurs. Veuillez réessayer plus tard.';
        },
      });
  }


  sortAuthors(): void {
    if (this.selectedSort === 'name') {
      this.authors.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.selectedSort === 'quoteCount') {
      this.authors.sort((a, b) => b.quoteCount - a.quoteCount);
    }
  }

  onSortChange(sortValue: string): void {
    this.selectedSort = sortValue;
    this.sortAuthors();
  }
}

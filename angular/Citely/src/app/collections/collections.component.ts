import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  collections: { name: string, image: string, quoteCount: number }[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Fetch tags and match them to their images and quoteCount
    this.http.get<any>('https://api.quotable.io/tags').subscribe(
      (data) => {
        this.collections = data.map((tag: { name: string, quoteCount: number }) => ({
          name: tag.name,
          image: this.getImageForTag(tag.name),
          quoteCount: tag.quoteCount
        }));
      },
      (error) => {
        console.error('Error fetching tags', error);
      }
    );
  }

  // Navigate to CollectionDetailsComponent with the selected tag
  onCollectionClick(collectionName: string): void {
    this.router.navigate(['/collections', collectionName]);
  }

  // Map the tag name to the corresponding image file
  getImageForTag(tagName: string): string {
    const imageMap: { [key: string]: string } = {
      'Age': 'Age.jpg',
      'Athletics': 'Athletics.jpg',
      'Business': 'Business.jpg',
      'Change': 'Change.jpg',
      'Character': 'Character.jpg',
      'Competition': 'Competition.jpg',
      'Creativity': 'Creativity.jpg',
      'Conservative': 'Conservative.jpg',
      'Courage': 'Courage.jpg',
      'Education': 'Education.jpg',
      'Ethics': 'Ethics.jpg',
      'Failure': 'Failure.jpg',
      // Add more tags as needed
    };
    return imageMap[tagName] || ''; // Default to empty string if no match found
  }
}

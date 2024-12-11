import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-collections-detail',
  templateUrl: './collections-detail.component.html',
  styleUrls: ['./collections-detail.component.css']
})
export class CollectionsDetailComponent implements OnInit {

  collectionName: string = '';
  collectionImage: string = '';
  quotes: { content: string, author: string }[] = []; // Updated to include author

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Get the collection name (tag) from the route parameters
    this.collectionName = this.route.snapshot.paramMap.get('tag')!;
    this.collectionImage = this.getImageForTag(this.collectionName);

    // Fetch quotes for the selected collection
    this.http.get<any>(`https://api.quotable.io/quotes?tags=${this.collectionName}`).subscribe(
      (data) => {
        // Update quotes with both content and author
        this.quotes = data.results.map((quote: { content: string, author: string }) => ({
          content: quote.content,
          author: quote.author
        }));
      },
      (error) => {
        console.error('Error fetching quotes', error);
      }
    );
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

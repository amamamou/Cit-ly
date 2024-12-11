import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionsDetailComponent } from './collections-detail/collections-detail.component';
import { QuotesComponent } from './quotes/quotes.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'authors', component: AuthorsComponent }, // Add Authors route
  { path: 'author/:id', component: AuthorDetailComponent }, // Dynamic route for author details
  { path: 'collections', component: CollectionsComponent }, // Dynamic route for collections
  { path: 'collections/:tag', component: CollectionsDetailComponent },
  { path: 'quotes', component: QuotesComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthorsComponent } from './authors/authors.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'authors', component: AuthorsComponent }, // Add Authors route


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

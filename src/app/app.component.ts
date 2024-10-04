import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatSearchComponent } from './cat-search/cat-search.component';
import { CatListComponent } from './cat-list/cat-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CatSearchComponent, CatListComponent, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Cat Picture Filter';
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Store } from '@ngxs/store';
import { CatState } from '../store/cat.state';
import { Observable } from 'rxjs';
import { Cat } from '../models';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-cat-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, LoadingComponent],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.scss',
})
export class CatListComponent implements OnInit {
  private readonly store = inject(Store);
  cats$!: Observable<Cat[]>;
  isLoading$!: Observable<boolean>;

  ngOnInit() {
    this.cats$ = this.store.select(CatState.getCats);
    this.isLoading$ = this.store.select(CatState.isLoading);
  }
}

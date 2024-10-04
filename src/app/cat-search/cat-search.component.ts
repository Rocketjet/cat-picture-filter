import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngxs/store';
import { FetchBreeds, FetchCats } from '../store/cat.actions';
import { CatState } from '../store/cat.state';
import { Observable } from 'rxjs';
import { Breed } from '../models';

@Component({
  selector: 'app-cat-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './cat-search.component.html',
  styleUrl: './cat-search.component.scss',
})
export class CatSearchComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);

  searchForm!: FormGroup;
  breeds$!: Observable<Breed[]>;

  ngOnInit() {
    this.searchForm = this.fb.group({
      breed: [''],
      limit: [
        10,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });
    this.breeds$ = this.store.select(CatState.getBreeds);
    this.store.dispatch(new FetchBreeds());
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const { breed, limit } = this.searchForm.value;
      this.store.dispatch(new FetchCats(breed, limit));
    }
  }
}

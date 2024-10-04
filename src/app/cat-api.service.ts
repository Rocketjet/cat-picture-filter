import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../environments/environment';
import { Breed, Cat } from './models';

@Injectable({
  providedIn: 'root',
})
export class CatApiService {
  private readonly http: HttpClient = inject(HttpClient);

  getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${API.URL}/breeds`, {
      headers: { 'x-api-key': API.KEY },
    });
  }

  getCats(breed: string, limit: number): Observable<Cat[]> {
    return this.http.get<Cat[]>(`${API.URL}/images/search`, {
      params: { breed_ids: breed, limit: limit.toString() },
      headers: { 'x-api-key': API.KEY },
    });
  }
}

import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { FetchBreeds, SetBreeds, FetchCats, SetCats } from './cat.actions';
import { CatApiService } from '../cat-api.service';
import { tap, finalize } from 'rxjs/operators';
import { Breed, Cat } from '../models';

export interface CatStateModel {
  breeds: Breed[];
  cats: Cat[];
  isLoading: boolean;
}

@State<CatStateModel>({
  name: 'cats',
  defaults: {
    breeds: [],
    cats: [],
    isLoading: false
  }
})
@Injectable()
export class CatState {
  constructor(private catApiService: CatApiService) {}

  @Selector()
  static getBreeds(state: CatStateModel) {
    return state.breeds;
  }

  @Selector()
  static getCats(state: CatStateModel) {
    return state.cats;
  }

  @Selector()
  static isLoading(state: CatStateModel) {
    return state.isLoading;
  }

  @Action(FetchBreeds)
  fetchBreeds(ctx: StateContext<CatStateModel>) {
    ctx.patchState({ isLoading: true });
    return this.catApiService.getBreeds().pipe(
      tap(breeds => {
        ctx.dispatch(new SetBreeds(breeds));
      }),
      finalize(() => {
        ctx.patchState({ isLoading: false });
      })
    );
  }

  @Action(FetchCats)
  fetchCats(ctx: StateContext<CatStateModel>, action: FetchCats) {
    ctx.patchState({ isLoading: true });
    return this.catApiService.getCats(action.breed, action.limit).pipe(
      tap(results => {
        ctx.dispatch(new SetCats(results));
      }),
      finalize(() => {
        ctx.patchState({ isLoading: false });
      })
    );
  }

  @Action(SetBreeds)
  setBreeds(ctx: StateContext<CatStateModel>, action: SetBreeds) {
    ctx.patchState({
      breeds: action.breeds
    });
  }

  @Action(SetCats)
  setCats(ctx: StateContext<CatStateModel>, action: SetCats) {
    ctx.patchState({
      cats: action.results
    });
  }
}

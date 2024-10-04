import { Breed, Cat } from '../models';

export class FetchBreeds {
  static readonly type = '[Cats] Fetch Breeds';
}

export class FetchCats {
  static readonly type = '[Cats] Fetch Cats';
  constructor(public breed: string, public limit: number) {}
}

export class SetCats {
  static readonly type = '[Cats] Set Cats';
  constructor(public results: Cat[]) {}
}

export class SetBreeds {
  static readonly type = '[Cats] Set Breeds';
  constructor(public breeds: Breed[]) {}
}

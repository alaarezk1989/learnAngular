import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('pasta', 'ala pasta with red souce', 'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/05/masala-pasta-500x500.jpg'),
    new Recipe('pizaa', 'ala pizza with red souce', 'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/05/masala-pasta-500x500.jpg')
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  constructor() {
  }

  // tslint:disable-next-line:typedef
  setToActive(name: string) {
    console.log(name + ' = active');
  }

}

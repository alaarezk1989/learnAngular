import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {


  private recipes: Recipe[] = [
    new Recipe('pasta',
      'pasta with white sauce',
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/05/masala-pasta-500x500.jpg',
      [
        new Ingredient('pasta', 300),
        new Ingredient('milk', 50),
        new Ingredient('mushroom', 2)
      ]),
    new Recipe('pizza',
      'pizza with red sauce',
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/05/masala-pasta-500x500.jpg',
      [
        new Ingredient('Flour', 500),
        new Ingredient('Tomatoes', 10),
        new Ingredient('meat', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {
  }
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index:number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  // tslint:disable-next-line:typedef
  setToActive(name: string) {
    console.log(name + ' = active');
  }

}

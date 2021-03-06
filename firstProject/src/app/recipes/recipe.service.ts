import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('pasta',
  //     'pasta with white sauce',
  //     'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/05/masala-pasta-500x500.jpg',
  //     [
  //       new Ingredient('pasta', 300),
  //       new Ingredient('milk', 50),
  //       new Ingredient('mushroom', 2)
  //     ]),
  //   new Recipe('pizza',
  //     'pizza with red sauce',
  //     'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/05/masala-pasta-500x500.jpg',
  //     [
  //       new Ingredient('Flour', 500),
  //       new Ingredient('Tomatoes', 10),
  //       new Ingredient('meat', 1)
  //     ])
  // ];

  private recipes: Recipe[]=[];

  constructor(private slService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]){
    this.recipes=recipes;
    this.recipeChanged.next(this.recipes.slice());

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

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number,newRecipe: Recipe){
    this.recipes[index]=newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }

}

import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('pasta', 'ala pasta with red souce', 'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/05/masala-pasta-500x500.jpg'),
    new Recipe('pizaa', 'ala pizza with red souce', 'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/05/masala-pasta-500x500.jpg')
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}

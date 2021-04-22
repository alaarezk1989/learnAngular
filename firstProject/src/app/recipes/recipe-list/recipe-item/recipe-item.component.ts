import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../recipe.model';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe = {name: '', description: '', imagePath: ''};

  constructor() {
  }

  ngOnInit(): void {
  }

}

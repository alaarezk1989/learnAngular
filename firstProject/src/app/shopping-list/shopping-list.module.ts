import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthInterceptorService } from "../auth/auth-interceptor.service";
import { RecipeService } from "../recipes/recipe.service";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListService } from "./shopping-list.service";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'shopping-list', component: ShoppingListComponent},
    ]),
  ],
  providers: [ShoppingListService,RecipeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true }
  ]
})

export class ShoppingListModule{

}

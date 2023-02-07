import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./components/partials/page-not-found/page-not-found.component";
import {LoginSignUpPageComponent} from "./components/login-sign-up-page/login-sign-up-page.component";
import {ListSujetsComponent} from "./components/list-sujets/list-sujets.component";

const routes: Routes = [
  {path:'',redirectTo:'/sujets/ListSujets',pathMatch:'full'},
  {path:'sujets',children:
      [
    {path: 'ListSujets',component: ListSujetsComponent}
    ]
  },
  {path:"", children:[{path:'LoginSignUpPage',component:LoginSignUpPageComponent}]},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

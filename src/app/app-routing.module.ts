import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./components/partials/page-not-found/page-not-found.component";
import {LoginSignUpPageComponent} from "./components/login-sign-up-page/login-sign-up-page.component";
import {ListSujetsComponent} from "./components/list-sujets/list-sujets.component";
import {EnseignantComponentLog} from "./components/login/enseignantLog/enseignant.component.log";
import {EnseignantComponent} from "./components/signup/enseignant/enseignant.component";
import {EtudiantComponentLog} from "./components/login/etudiantLog/etudiant.component.log";
import {EtudiantComponent} from "./components/signup/etudiant/etudiant.component";
import {AdminComponent} from "./components/login/admin/admin.component";
import {VerificationComponent} from "./components/verification/verification.component";

const routes: Routes = [
  {path:'',redirectTo:'/sujets/ListSujets',pathMatch:'full'},
  {path:'sujets',children:
      [
        {path: 'ListSujets',component: ListSujetsComponent}
    ]
  },

  {path:'login',component:LoginSignUpPageComponent},
  {path:'login',children:[
      {path:'enseignantLog',component:EnseignantComponentLog},
      {path:'enseignantSignUp',component: EnseignantComponent},
      {path:'etudiantLog',component:EtudiantComponentLog},
      {path:'etudiantSignUp',component:EtudiantComponent},
      {path:'admin',component:AdminComponent}
    ]},
  {path:'verification',component:VerificationComponent},
  {path:"**",component:PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

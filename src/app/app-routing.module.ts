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
import {
  EmailVerificationComponent
} from "./components/passwordForgotton/email-verification/email-verification.component";
import {KeyVerificationComponent} from "./components/passwordForgotton/key-verification/key-verification.component";
import {ResetPasswordComponent} from "./components/passwordForgotton/reset-password/reset-password.component";
import {DashboardEtudiantComponent} from "./components/dashboard/dashboard-etudiant/dashboard-etudiant.component";
import {DashboardEneignantComponent} from "./components/dashboard/dashboard-eneignant/dashboard-eneignant.component";
import {DashboardAdminComponent} from "./components/dashboard/dashboard-admin/dashboard-admin.component";

import {EtudiantSettingsComponent} from "./components/settings/etudiant-settings/etudiant-settings.component";
import {EnseignantSettingsComponent} from "./components/settings/enseignant-settings/enseignant-settings.component";
import {AdminSettingsComponent} from "./components/settings/admin-settings/admin-settings.component";
import {MesSujetComponent} from "./components/list-sujets/mes-sujet/mes-sujet.component";
import {RendesVousComponent} from "./components/dashboard/dashboard-eneignant/rendes-vous/rendes-vous.component";
import {JuryEspaceComponent} from "./components/dashboard/dashboard/jury-espace/jury-espace.component";
import {WaitingforverificationComponent} from "./components/signup/waitingforverification/waitingforverification.component";

const routes: Routes = [
  {path:'',redirectTo:'/sujets/ListSujets',pathMatch:'full'},
  {path:'sujets',children:
      [
        {path: 'ListSujets',component: ListSujetsComponent},
    ]
  },

  {path:'login',component:LoginSignUpPageComponent},
  {path:'login',children:[
      {path:'enseignantLog',component:EnseignantComponentLog},
      {path:'enseignantSignUp',component: EnseignantComponent},
      {path:'etudiantLog',component:EtudiantComponentLog},
      {path:'etudiantSignUp',component:EtudiantComponent},
      {path:'admin',component:AdminComponent},
      {path:'pleaseVerify',component:WaitingforverificationComponent}
    ]},
  {path:'forgetPassword',children:[
      {path:'emailVerification',component: EmailVerificationComponent},
      {path:'keyVerification',component: KeyVerificationComponent},
      {path:'resetPassword',component: ResetPasswordComponent}
    ] },
  {path:'dashboard',children:[
      {path: 'dashboardEtudiant',component: DashboardEtudiantComponent},
      {path: 'home',children:[
          {path: 'dashboardEnseignant',component: DashboardEneignantComponent},
          {path:'mesSujets',component:MesSujetComponent},
          {path:'rendesVous',component:RendesVousComponent},
          {path:'juryEspace',component:JuryEspaceComponent}
        ]
      },
      {path: 'dashboardAdmin',component: DashboardAdminComponent},
    ]},
  {path:'settings',children:[
      {path:'etudiantSettings',component: EtudiantSettingsComponent},
      {path:'enseignantSettings',component: EnseignantSettingsComponent},
      {path:'adminSettings',component: AdminSettingsComponent}
    ]},
  {path:'verification',component:VerificationComponent},
  {path:"**",component:PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

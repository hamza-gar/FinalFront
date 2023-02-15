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
import {MonSujetComponent} from "./components/dashboard/dashboard-etudiant/mon-sujet/mon-sujet.component";
import {VoirRemarqueComponent} from "./components/dashboard/dashboard-etudiant/voir-remarque/voir-remarque.component";
import {MesPostulationComponent} from "./components/dashboard/dashboard-etudiant/mes-postulation/mes-postulation.component";
import {DomainesComponent} from "./components/Admin/domaines/domaines.component";
import {AuthGuard} from "./guards/auth.guard";
import {AfterAuthGuard} from "./guards/after-auth.guard";
import {EnseignantGuardGuard} from "./guards/enseignant-guard.guard";
import {EtudiantGuardGuard} from "./guards/etudiant-guard.guard";
import {AdminGuard} from "./guards/admin.guard";

const routes: Routes = [
  {path:'',redirectTo:'/sujets/ListSujets',pathMatch:'full'},
  {path:'sujets',children:
      [
        {path: 'ListSujets',component: ListSujetsComponent},
    ],
  },

  {path:'login',component:LoginSignUpPageComponent,canActivate:[AfterAuthGuard]},
  {path:'login',children:[
      {path:'enseignantLog',component:EnseignantComponentLog},
      {path:'enseignantSignUp',component: EnseignantComponent},
      {path:'etudiantLog',component:EtudiantComponentLog},
      {path:'etudiantSignUp',component:EtudiantComponent},
      {path:'admin',component:AdminComponent},
      {path:'pleaseVerify',component:WaitingforverificationComponent}
    ],canActivate:[AfterAuthGuard]},
  {path:'forgetPassword',children:[
      {path:'emailVerification',component: EmailVerificationComponent},
      {path:'keyVerification',component: KeyVerificationComponent},
      {path:'resetPassword',component: ResetPasswordComponent}
    ] },
  {path:'dashboard',children:[
      {path: 'etudiant',children:[
          {path: 'dashboardEtudiant',component: DashboardEtudiantComponent, canActivate: [EtudiantGuardGuard]},
          {path: 'monSujet',component: MonSujetComponent, canActivate: [EtudiantGuardGuard]},
          {path: 'voirRemarque',component: VoirRemarqueComponent, canActivate: [EtudiantGuardGuard]},
          {path: 'postulation',component: MesPostulationComponent, canActivate: [EtudiantGuardGuard]}
        ]},
      {path: 'home',children:[
          {path: 'dashboardEnseignant',component: DashboardEneignantComponent, canActivate: [EnseignantGuardGuard]},
          {path:'mesSujets',component:MesSujetComponent, canActivate: [EnseignantGuardGuard]},
          {path:'rendesVous',component:RendesVousComponent, canActivate: [EnseignantGuardGuard]},
          {path:'juryEspace',component:JuryEspaceComponent, canActivate: [EnseignantGuardGuard]}
        ]
      },
    ]},
  {path:'settings',children:[
      {path:'etudiantSettings',component: EtudiantSettingsComponent, canActivate: [EtudiantGuardGuard]},
      {path:'enseignantSettings',component: EnseignantSettingsComponent, canActivate: [EnseignantGuardGuard]}
    ]},

  {path:'verification',component:VerificationComponent},
  {path:'domaines',component:DomainesComponent, canActivate: [AdminGuard]},
  {path:"**",component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

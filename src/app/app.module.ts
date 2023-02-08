import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { PageNotFoundComponent } from './components/partials/page-not-found/page-not-found.component';
import { LoginSignUpPageComponent } from './components/login-sign-up-page/login-sign-up-page.component';
import { ListSujetsComponent } from './components/list-sujets/list-sujets.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { EnseignantComponentLog } from './components/login/enseignantLog/enseignant.component.log';
import { EtudiantComponentLog } from './components/login/etudiantLog/etudiant.component.log';
import {EnseignantComponent} from "./components/signup/enseignant/enseignant.component";
import {EtudiantComponent} from "./components/signup/etudiant/etudiant.component";
import { AdminComponent } from './components/login/admin/admin.component';
import { VerificationComponent } from './components/verification/verification.component';
import { EmailVerificationComponent } from './components/passwordForgotton/email-verification/email-verification.component';
import { KeyVerificationComponent } from './components/passwordForgotton/key-verification/key-verification.component';
import { ResetPasswordComponent } from './components/passwordForgotton/reset-password/reset-password.component';
import { DashboardEtudiantComponent } from './components/dashboard/dashboard-etudiant/dashboard-etudiant.component';
import { DashboardEneignantComponent } from './components/dashboard/dashboard-eneignant/dashboard-eneignant.component';
import { DashboardAdminComponent } from './components/dashboard/dashboard-admin/dashboard-admin.component';
//import {JwtInterceptor} from "./services/jwt.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
    LoginSignUpPageComponent,
    ListSujetsComponent,
    EnseignantComponentLog,
    EtudiantComponentLog,
    EnseignantComponent,
    EtudiantComponent,
    AdminComponent,
    VerificationComponent,
    EmailVerificationComponent,
    KeyVerificationComponent,
    ResetPasswordComponent,
    DashboardEtudiantComponent,
    DashboardEneignantComponent,
    DashboardAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

  ],
  providers: [
    // {provide:HTTP_INTERCEPTORS,
    // useClass:JwtInterceptor,
    // multi:true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

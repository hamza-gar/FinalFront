import { Component } from '@angular/core';
import {Login} from "../../../classes/login";
import {TokenService} from "../../../services/token.service";
import {Router} from "@angular/router";
import {AccountService} from "../../../services/account.service";
import {LoginService} from "../../../services/login.service";
import {UserType} from "../../../classes/UserType";

@Component({
  selector: 'app-enseignantLog',
  templateUrl: './enseignant.component.log.html',
  styleUrls: ['./enseignant.component.log.css']
})
export class EnseignantComponentLog {
  login : Login = new Login();
  type:string = "password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";

  constructor(private tokenService:TokenService,
              private router:Router,
              private accountService:AccountService,
              private loginService:LoginService) {
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon="fa-eye-slash";
    this.isText ? this.type = "text": this.type="password";
  }

  LoginRegister(){
    console.log(this.login);

    this.loginService.loginEnseignant(this.login).subscribe(data=>{
      this.handleResponse(data)
    },error=>alert("you should sign up"));
  }
    handleResponse(res:any){
    this.tokenService.handle(res)
    this.accountService.changeStatus(true);
    this.router.navigateByUrl("/dashboard/dashboardEnseignant")
  }
}

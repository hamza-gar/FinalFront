import { Component } from '@angular/core';
import {TokenService} from "../../../services/token.service";
import {Router} from "@angular/router";
import {AccountService} from "../../../services/account.service";
import {LoginService} from "../../../services/login.service";
import {Login} from "../../../classes/login";

@Component({
  selector: 'app-etudiantLog',
  templateUrl: './etudiant.component.log.html',
  styleUrls: ['./etudiant.component.log.css']
})
export class EtudiantComponentLog {
  login:Login = new Login();
  type:string = "password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  constructor(private tokenService:TokenService,
              private router:Router,
              private accountService:AccountService,
              private loginService:LoginService) {}
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon="fa-eye-slash";
    this.isText ? this.type = "text": this.type="password";
  }

  LoginRegister(){

    this.loginService.loginEtudiant(this.login).subscribe(data=>{
      this.handleResponse(data)

    },error=>alert("you should sign up"));
  }

  handleResponse(res:any){
    this.tokenService.handle(res)
    this.accountService.changeStatus(true);
    // this.router.navigateByUrl("/dashboardEtudiant")
    alert("all good");
  }

}

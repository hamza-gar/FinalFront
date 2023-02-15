import { Component } from '@angular/core';
import {MailHandler} from "../../../services/mailHandler";
import {HeaderResetPasswordHandlerService} from "../../../services/header-reset-password-handler.service";
import {ResetPasswordService} from "../../../services/reset-password.service";
import {HttpHeaders} from "@angular/common/http";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email!:string;
  header!:HttpHeaders;

  type:string = "password";
  type1:string = "password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  eyeIcon1:string="fa-eye-slash";

  password1!:string;
  password2!:string;

  token!:string;

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon="fa-eye-slash";
    this.isText ? this.type = "text": this.type="password";
  }
  hideShowPass1(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon1 = "fa-eye": this.eyeIcon1="fa-eye-slash";
    this.isText ? this.type1 = "text": this.type1="password";
  }

  constructor(private mailHandler:MailHandler,
              private headerResetPasswordHandlerService:HeaderResetPasswordHandlerService,
              private resetPasswordService:ResetPasswordService,private router:Router) {}
  ngOnInit(): void {
    this.email=this.mailHandler.getMail()
    this.header=this.headerResetPasswordHandlerService.getHeader()
  }
  UpdateUser(){
    console.log(this.headerResetPasswordHandlerService.getHeader());
    this.token=this.headerResetPasswordHandlerService.getHeader().toString();
    console.log(this.mailHandler.getMail());
    if(this.password1 !== this.password2){
      alert("it must be the same password");
    }else {
      this.updatePass(this.mailHandler.getMail(), this.password1,this.token);
      this.headerResetPasswordHandlerService.setHeaders(new HttpHeaders());
      this.mailHandler.setMail("");
    }
  }
  updatePass(mail: string, password: string,token:string) {
    this.resetPasswordService.changePassword(mail, password,token)
      .subscribe(operation => {
          this.router.navigate(['/login']);
        },
        error =>  {
          alert(error.error.message);
        });
  }

}

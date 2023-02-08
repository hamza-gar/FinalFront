import {Component, OnInit} from '@angular/core';
import {MailHandler} from "../../../services/mailHandler";
import {Router} from "@angular/router";
import {ResetPasswordService} from "../../../services/reset-password.service";
import {HeaderResetPasswordHandlerService} from "../../../services/header-reset-password-handler.service";

@Component({
  selector: 'app-key-verification',
  templateUrl: './key-verification.component.html',
  styleUrls: ['./key-verification.component.css']
})
export class KeyVerificationComponent implements OnInit{
  mail!:string;
  first!:string;
  second!:string;
  third!:string;
  fourth!:string;
  fifth!:string;
  sixth!:string;

  key!:string;

  ngOnInit(): void {
    this.mail = this.mailHandler.getMail();
    console.log(this.mail)
  }
  constructor(private mailHandler: MailHandler,
              private headerResetPasswordHandlerService: HeaderResetPasswordHandlerService,
              private resetPasswordService:ResetPasswordService,
              private router: Router) { }

  onClick() {
    this.key=this.first + this.second + this.third + this.fourth + this.fifth + this.sixth;
    this.checkKey(this.mail, this.key);

  }

  checkKey(mail: string, key: string) {
    this.resetPasswordService.checkKey(mail, key)
      .subscribe(operation => {
          console.log(operation)
          const {key} = operation
          this.headerResetPasswordHandlerService.setHeaders(key);
          console.log(key);
          this.router.navigate(['/forgetPassword/resetPassword']);
        },
        error =>  {
          console.log("false");
        });
  }

}

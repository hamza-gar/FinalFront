import {Component, OnInit} from '@angular/core';
import {mailClass} from "../../../classes/MailClass";
import {Router} from "@angular/router";
import {ResetPasswordService} from "../../../services/reset-password.service";
import {MailHandler} from "../../../services/mailHandler";

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  mail1!: string;
  mail : mailClass = new mailClass();
  showDots:Boolean=true;
  locked:Boolean=true;

  constructor(private mailHanlder:MailHandler,private resetPasswordService:ResetPasswordService,private router: Router) { }

  ngOnInit(): void {
    this.showDots=true;
  }

  onClick() {
    console.log(this.mail1)
    this.mailHanlder.setMail(this.mail1);
    this.showDots=false;
    this.locked=false;

    this.resetPasswordService.VerifyEmail(this.mail).subscribe(data=>{
      this.router.navigate(['/forgetPassword/keyVerification']);
    },error=>{
      alert("there is no email like this in data base")
      this.locked=true;
      this.showDots=true;
    });

  }
  onGetMail(event: any) {
    this.mail1 = (<HTMLInputElement>event.target).value;
    this.mail.email = this.mail1;
  }

}

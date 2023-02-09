import {Component, OnInit} from '@angular/core';
import {enseignantSignUp} from "../../../classes/enseignantSignUp";
import {SignupService} from "../../../services/signup.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-enseignantLog',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css']
})
export class EnseignantComponent implements OnInit{

  showDots:Boolean=true;
  locked:Boolean=true;
  signup :enseignantSignUp = new enseignantSignUp();

  type:string = "password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  constructor(private signupEnseignant : SignupService, private routerLink:Router) {
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon="fa-eye-slash";
    this.isText ? this.type = "text": this.type="password";
  }
  SignUpRegister(){
    console.log(this.signup);
    this.showDots=false;
    this.locked=false;
    this.signupEnseignant.signupEnseignant(this.signup).subscribe(data=>{
      this.routerLink.navigate(['/login']);
    },error=>{alert("sorry User not register")
      this.locked=true;
      this.showDots=true;
    });

  }

  ngOnInit(): void {
    this.showDots=true;
  }

}

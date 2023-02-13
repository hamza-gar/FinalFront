import {Component, OnInit} from '@angular/core';
import {etudiantSignUp} from "../../../classes/etudiantSignUp";
import {SignupService} from "../../../services/signup.service";
import {FiliereResponse} from "../../../classes/FiliereResponse";
import {sujetRequirement} from "../../../classes/sujetRequirement";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-etudiantLog',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent  implements OnInit{

  signup:etudiantSignUp=new etudiantSignUp();
  filieres!:FiliereResponse[];

  showDots:Boolean=true;
  locked:Boolean=true;

  type:string = "password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  constructor(private signupEtudiant : SignupService, private route: Router) {
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
    this.signupEtudiant.signupEtudiant(this.signup).subscribe(data=>{

      this.route.navigate(['/login']);
    },error=>{
      alert("sorry User not register")
      this.locked=true;
      this.showDots=true;
    });
  }

  fillDropDownList(){
    this.signupEtudiant.getNomFiliere(0,100).subscribe(
      (response: FiliereResponse[]) => {
        this.filieres = response;
        console.log(this.filieres);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      })
  }

  ngOnInit(): void {
    this.fillDropDownList();
    this.showDots=true;
  }

}

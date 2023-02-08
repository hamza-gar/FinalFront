import {Component, OnInit} from '@angular/core';

import {TokenService} from "../../../services/token.service";
import {Router} from "@angular/router";
import {EnseignantService} from "../../../services/enseignant.service";
import {HttpErrorResponse} from "@angular/common/http";
import {enseignantSignUp} from "../../../classes/enseignantSignUp";

@Component({
  selector: 'app-enseignant-settings',
  templateUrl: './enseignant-settings.component.html',
  styleUrls: ['./enseignant-settings.component.css']
})
export class EnseignantSettingsComponent implements OnInit{

  Inputnom!:string;
  Inputprenom!:string;
  Inputpassword!:string;

  enseignantResponse!:enseignantSignUp;
  type:string = "password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  ngOnInit(): void {
    this.getEnseignant();
  }

  constructor(private enseignantService:EnseignantService,private tokenService:TokenService,private router:Router) {
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon="fa-eye-slash";
    this.isText ? this.type = "text": this.type="password";
  }
  getEnseignant(){
    this.enseignantService.getEnseignant(this.tokenService.getId()).subscribe(
      (response: enseignantSignUp)=>{
        this.enseignantResponse =response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);}
    );
  }

  updateEnseignant(){
    if(this.Inputnom!=null){
      this.enseignantResponse.nom=this.Inputnom;
    }
    if(this.Inputprenom!=null){
      this.enseignantResponse.prenom=this.Inputprenom;
    }
    if(this.Inputpassword!=null){
      this.enseignantResponse.password=this.Inputpassword;
    }
    this.enseignantService.updateEnseignant(this.enseignantResponse,this.tokenService.getId()).subscribe(
      operation=>{
        alert("done");
        this.router.navigateByUrl("/sujets/ListSujets");
      },error => {alert("there is a error")}
    )
  }

}

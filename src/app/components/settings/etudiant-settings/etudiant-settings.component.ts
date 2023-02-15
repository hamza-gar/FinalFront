import {Component, OnInit} from '@angular/core';
import {EtudiantService} from "../../../services/etudiant.service";
import {TokenService} from "../../../services/token.service";
import {EtudiantResponse} from "../../../classes/EtudiantResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";


@Component({
  selector: 'app-etudiant-settings',
  templateUrl: './etudiant-settings.component.html',
  styleUrls: ['./etudiant-settings.component.css']
})
export class EtudiantSettingsComponent implements OnInit{

  Inputnom!:string;
  Inputprenom!:string;
  Inputpassword!:string;

  type:string = "password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";

  public etudiantResponse!:EtudiantResponse
  ngOnInit(): void {
    this.getEtudiant()
  }
constructor(private etudiantService:EtudiantService,private tokenService:TokenService,private router:Router) {
}


  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon="fa-eye-slash";
    this.isText ? this.type = "text": this.type="password";
  }

getEtudiant(){
    this.etudiantService.getEtudiant(this.tokenService.getId()).subscribe(
      (response: EtudiantResponse)=>{
        this.etudiantResponse =response;
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);}
    );
}

updateEtudiant(){
    if(this.Inputnom!=null){
      this.etudiantResponse.nom=this.Inputnom;
    }
  if(this.Inputprenom!=null){
    this.etudiantResponse.prenom=this.Inputprenom;
  }
  if(this.Inputpassword!=null){
    this.etudiantResponse.password=this.Inputpassword;
  }
  this.etudiantService.updateEtudiant(this.etudiantResponse,this.tokenService.getId()).subscribe(
    operation=>{
      window.location.reload();
    },error => {alert(error.error.message);}
  )
}

}

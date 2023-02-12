import {Component, OnInit,EventEmitter, Output} from '@angular/core';
import {enseignantSignUp} from "../../../classes/enseignantSignUp";
import {SignupService} from "../../../services/signup.service";
import {Router} from "@angular/router";
import {FiliereResponse} from "../../../classes/FiliereResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {DepartementResponse} from "../../../classes/DepartementResponse";
import {EtablissementResponse} from "../../../classes/EtablissementResponse";

@Component({
  selector: 'app-enseignantLog',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css']
})
export class EnseignantComponent implements OnInit {

  showDots: Boolean = true;
  locked: Boolean = true;
  signup: enseignantSignUp = new enseignantSignUp();
  etablissementSelected: boolean = false;
  departements!: DepartementResponse[];
  etablissements!: EtablissementResponse[];
  selectedEtablissement!: EtablissementResponse;
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  value!:number;

  constructor(private signupEnseignant: SignupService, private routerLink: Router) {
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  SignUpRegister() {
    console.log(this.signup);
    this.showDots = false;
    this.locked = false;
    this.signupEnseignant.signupEnseignant(this.signup).subscribe(data => {
      this.routerLink.navigate(['/login']);
    }, error => {
      alert("sorry User not register")
      this.locked = true;
      this.showDots = true;
    });
  }

  getEtablissement() {
    this.signupEnseignant.getEtablissement().subscribe(
      (response: EtablissementResponse[]) => {
        this.etablissements = response;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      })
  }

  getDepartement(nomEtablissement:string) {
      console.log("this is the :", nomEtablissement);
    this.signupEnseignant.getDepartementsByEtablissement(nomEtablissement).subscribe(
      (response: DepartementResponse[]) => {
        this.departements = response;
        console.log("this is the departement :",this.departements);
      },error => {console.log(error)}
    )
  }

  test(){
    console.log()
  }
  // setIndex(index: number) {
  //   this.selectedEtablissement = this.etablissements[index];
  //
  //   console.log("console :", this.selectedEtablissement)
  //  // this.getDepartement();
  // }

  setValue(nomEtablissement:number){
    console.log(nomEtablissement)
  }
  ngOnInit(): void {
    this.getEtablissement();

    this.showDots = true;
  }

  onEtablissementSelected(etablissement :EtablissementResponse) {
    console.log(etablissement)
    console.log(etablissement.toString())
    this.getDepartement(etablissement.toString())
  }

}

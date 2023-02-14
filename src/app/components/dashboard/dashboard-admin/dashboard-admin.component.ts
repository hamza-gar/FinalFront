import {Component, OnInit} from '@angular/core';
import {UniversityResponse} from "../../../classes/UniversityResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {SujetService} from "../../../services/sujet.service";
import {GroupsServiceService} from "../../../services/groups-service.service";
import {TokenService} from "../../../services/token.service";
import {SignupService} from "../../../services/signup.service";
import {Router} from "@angular/router";
import {AdminService} from "../../../services/admin.service";
import {DomaineResponse} from "../../../classes/DomaineResponse";

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  public university!:UniversityResponse[];
  isEnseignant!:any;
  domaine:DomaineResponse=new DomaineResponse();
  constructor(private sujetService: SujetService ,
              private groupeService:GroupsServiceService,
              private tokenService:TokenService,
              private signup:SignupService,
              private admin:AdminService,

              private router:Router) {
  }

  public getUniversity(){
    this.sujetService.getUniversity().subscribe((res:UniversityResponse[])=>{
      this.university=res
      console.log("university :",res)
    },(error:HttpErrorResponse)=>{
      alert(error.error.message)
    })
  }
  selectUniversity(university:UniversityResponse){
    console.log("university",university)
  }
  submit(){
    const selectedOption = (document.querySelector('input[name="optradio"]:checked') as HTMLInputElement)?.value;
    console.log(selectedOption)
    if(selectedOption=="etudiant"){
      this.domaine.etudiant=true
    }else{
      this.domaine.etudiant=false
    }
    this.domaine.nomDomaine=(document.getElementById("domaine") as HTMLInputElement).value;

  //this.addDomaine();
  }
  public addDomaine(){
    this.admin.addDomaine(this.domaine).subscribe((res:DomaineResponse)=>{
      console.log("domaine",res)
    },(error:HttpErrorResponse)=>{
      alert(error.error.message)
    })
  }
  ngOnInit(): void {
    this.getUniversity();

  }

}

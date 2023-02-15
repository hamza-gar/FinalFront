import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../../services/admin.service";
import {AddDomaineResponse} from "../../../classes/AddDomaineResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {UniversityResponse} from "../../../classes/UniversityResponse";
import {SujetService} from "../../../services/sujet.service";

@Component({
  selector: 'app-domaines',
  templateUrl: './domaines.component.html',
  styleUrls: ['./domaines.component.css']
})
export class DomainesComponent implements OnInit{
  domaineName!:string;
  domaine:AddDomaineResponse=new AddDomaineResponse();
  universe:UniversityResponse=new UniversityResponse();

  type!:string;

  public domaines!:AddDomaineResponse[];
  public university:UniversityResponse=new UniversityResponse();
  public universityList!:UniversityResponse[];
constructor(private adminService:AdminService,private sujetService:SujetService) {
}
  ngOnInit(): void {
  this.getAllDomaines();
    this.getUniversity();
  }
  getAllDomaines(){
    this.adminService.getDomaines(0,6).subscribe((res:AddDomaineResponse[])=>{
      this.domaines=res
    },(error:HttpErrorResponse)=>{
      alert(error.error.message)
    })
  }
  deleteDomaine(id:number){
    this.adminService.deleteDomaine(id).subscribe((res)=>{
      window.location.reload();
    },(error:HttpErrorResponse)=>{
      alert(error.error.message)
    })
  }

  myDomaine(index:number){
    this.domaine=this.domaines[index];
    this.deleteDomaine(this.domaine.id);

  }
  public getUniversity(){
    this.sujetService.getUniversity().subscribe((res:UniversityResponse[])=>{
      this.universityList=res
      console.log("university :",res)
    },(error:HttpErrorResponse)=>{
      alert(error.error.message)
    })
  }
  selectUniversity(university:UniversityResponse){
    this.universe=university
  }
  submit(){
    const selectedOption = (document.querySelector('input[name="optradio"]:checked') as HTMLInputElement)?.value;
    if(selectedOption=="etudiant"){
      this.domaine.etudiant=true
    }else{
      this.domaine.etudiant=false
    }
    this.domaine.nomDomaine=this.domaineName;
    console.log(this.domaine.nomDomaine);

    this.domaine.idUniversite=this.universe.idUniversite;
    console.log(this.domaine.idUniversite);
    this.addDomaine(this.domaine);
  }
  public addDomaine(domaine:AddDomaineResponse){
    this.adminService.addDomaine(domaine).subscribe((res:AddDomaineResponse)=>{
      window.location.reload();
    },(error:HttpErrorResponse)=>{
      alert(error.error.message)
    })
  }


}

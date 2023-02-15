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
      alert("Domaine deleted successfully");
    },(error:HttpErrorResponse)=>{
      alert(error.error.message)
    })
  }

  myDomaine(index:number){
    this.domaine=this.domaines[index];
    console.log(this.domaine.id);
    this.deleteDomaine(this.domaine.id);
    this.Update();
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
  Update(){
    const selectedOption = (document.querySelector('input[name="Upoptradio"]:checked') as HTMLInputElement)?.value;
    if(selectedOption=="etudiant"){
      this.domaine.etudiant=true
    }else{
      this.domaine.etudiant=false
    }
    this.domaine.nomDomaine=this.domaineName;
    console.log(this.domaine.nomDomaine);
    this.adminService.updateDomaine(this.domaine.id,this.domaine).subscribe((res:AddDomaineResponse)=>{
      alert("Domaine updated successfully");
    },(error:HttpErrorResponse)=>{
      alert(error.error.message)
    })
  }
  public addDomaine(domaine:AddDomaineResponse){
    this.adminService.addDomaine(domaine).subscribe((res:AddDomaineResponse)=>{
      console.log("domaine",res)
    },(error:HttpErrorResponse)=>{
      alert(error.error.message)
    })
  }


}

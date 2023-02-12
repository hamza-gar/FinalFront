import {Component, OnInit} from '@angular/core';
import {SujetService} from "../../../services/sujet.service";

import {GroupsServiceService} from "../../../services/groups-service.service";
import {sujetRequirement} from "../../../classes/sujetRequirement";
import {EquipeRequirement} from "../../../classes/EquipeRequirement";
import {SoutenanceService} from "../../../services/soutenance.service";
import {SoutenanceResponse} from "../../../classes/SoutenanceResponse";
import {Members} from "../../../classes/members";
import {EnseignantService} from "../../../services/enseignant.service";
import {EnseignantResponse} from "../../../classes/RemarqueResponse";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {enseignantSignUp} from "../../../classes/enseignantSignUp";
import {JuryResponse} from "../../../classes/JuryResponse";

@Component({
  selector: 'app-dashboard-eneignant',
  templateUrl: './dashboard-eneignant.component.html',
  styleUrls: ['./dashboard-eneignant.component.css']
})
export class DashboardEneignantComponent implements OnInit{

  public subjects: sujetRequirement = new sujetRequirement();
  public lisSubjects!:sujetRequirement[];
  public fullEquipe!:EquipeRequirement[];
  public enseignant!:enseignantSignUp[];
  public Jury!:JuryResponse[];

  public IdSoutenance:SoutenanceResponse=new SoutenanceResponse();

  enseignantSelected:enseignantSignUp=new enseignantSignUp();
  public equipeRequirement:EquipeRequirement=new EquipeRequirement();

  public soutenanceResponse:SoutenanceResponse=new SoutenanceResponse();

  public  member!:Members[][];

  public typeJury!:string;


  public p: number = 0;
  constructor(private sujet:SujetService,
              private groupService:GroupsServiceService,
              private soutenanceService:SoutenanceService,
              private enseignantService:EnseignantService) {}


  public getMyLockedSujets(p:number){
    this.p=p;
    this.sujet.getMyLockedSujets(this.p,6).subscribe((response:sujetRequirement[])=>{
      this.lisSubjects=response;
    },error =>{
      alert(error);
      }
    )
  }



  public validateSujet(){
    this.subjects.done=true;
    this.sujet.validateSujet(this.subjects).subscribe(res=>{
      console.log("done")
    },error=>{
      console.log(error);
    })
  }
  myIndex(index:number){
    this.subjects=this.lisSubjects[index]
    this.soutenanceResponse.idSujet=this.subjects.idSujet;
  }
  public addSoutenance(){
    this.soutenanceService.addSoutenance(this.soutenanceResponse,this.subjects.idSujet).subscribe((response:SoutenanceResponse)=>{
      console.log("success")
    },error=>{
      console.log("error")
    })
  }

  getMemebersOfEquipe(){

    this.groupService.getMembersOfEquipe(this.equipeRequirement.idEquipe,this.member).subscribe(
      (operation:Members[][])=>{
        this.member=operation
      },error => {
        console.log(error);
      })
  }

  public getAllEnseignant(){
    console.log("hello")
    this.enseignantService.getAllEnseignant(0,6).subscribe((res:enseignantSignUp[])=>{
      this.enseignant=res
      console.log("enseignants :",res)
    },error=>{
      console.error(error)})
  }

  enseignantIndex(index:number){
    this.enseignantSelected=this.enseignant[index];
  }
  invite(){
    console.log("soutenance :",this.soutenanceResponse)
    console.log("this is soutenance ID :" ,this.soutenanceResponse.idSoutenance)
    this.soutenanceResponse.dateSoutenance = new Date(this.soutenanceResponse.dateSoutenance)
    this.soutenanceService.inviteJury(this.soutenanceResponse,this.enseignantSelected.email,this.typeJury).subscribe(
      res=>{console.log("hello")}
    );
  }

  public getSoutenanceByIdSujet(){
    this.soutenanceService.getSoutenanceByIdSujet(this.subjects.idSujet).subscribe((response:SoutenanceResponse)=>{
      this.soutenanceResponse=response;
      this.invite()
      console.log("this is the soutenance id :",response.idSoutenance);
    },error=>{console.log(error)})
  }

  public getInvitedJury(){
    console.log("hello")
    console.log(this.subjects.idSujet)
    this.enseignantService.getInvitedJurys(this.subjects.idSujet,0,6).subscribe((res:JuryResponse[])=>{
      console.log(res)

      this.getEquipeOfSujet(this.subjects.idSujet);
      this.Jury=res;
    },error=>{
      console.log("error");
    });
  }
  public getEquipeOfSujet(id:string){
    this.groupService.getEquipesOfSujet(id,0,10).subscribe((response:EquipeRequirement[])=>{
      this.fullEquipe = response;
      this.equipeRequirement=this.fullEquipe[0]
      console.log(this.equipeRequirement.idEquipe)
      console.log("testing :",response[0]);
      this.getMemebersOfEquipe()
    },error=>{
      alert(error);
    })
  }



  shareDriveLink(){

    this.groupService.shareDriveLink(this.fullEquipe[0]).subscribe((res:Boolean)=>{
      console.log(res);
    },error=>{
      console.log(error)
    })
  }
  ngOnInit(): void {
    this.getMyLockedSujets(this.p);
  }



}

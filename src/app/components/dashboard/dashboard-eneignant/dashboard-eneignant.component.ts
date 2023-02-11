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

  // public getEquipeOfSujet(p:number){
  //   this.p=p
  //   this.groupService.getEquipesOfSujet(this.subjects.idSujet,this.p,0).subscribe((response:EquipeRequirement[])=>{
  //     this.fullEquipe = response;
  //   },error=>{
  //     alert(error);
  //   })
  // }

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
   // this.equipeRequirement=this.fullEquipe[index]
    //this.getEquipeOfSujet(this.lisSubjects[index].idSujet,this.p);
  }
  public addSoutenance(){
    this.soutenanceService.addSoutenance(this.soutenanceResponse,this.subjects.idSujet).subscribe((response:SoutenanceResponse)=>{
      console.log("success")
    },error=>{
      console.log("error")
    })
  }
  // public getEquipeById(id:string){
  //   this.groupService.getEquipeById(id).subscribe(
  //     (res:EquipeRequirement)=>{
  //       this.equipeRequirement=res
  //     },error => {alert(error.message)}
  //   )
  // }
  // getMemebersOfEquipe(index:number){
  //   this.getEquipeById(this.fullEquipe[index].idEquipe)
  //   this.groupService.getMembersOfEquipe(this.fullEquipe[index].idEquipe,this.member).subscribe(
  //     (operation:Members[][])=>{
  //       this.member=operation
  //     },error => {
  //       console.log(error);
  //     })
  // }

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
    this.soutenanceResponse.idSoutenance="335bqUvxy66K9qbZJhiTtpZgPWx6hLDu"
    this.soutenanceService.inviteJury(this.soutenanceResponse,this.enseignantSelected.email,this.typeJury).subscribe(
      res=>{console.log("hello")}
    );
  }
  ngOnInit(): void {
    this.getMyLockedSujets(this.p);
  }



}

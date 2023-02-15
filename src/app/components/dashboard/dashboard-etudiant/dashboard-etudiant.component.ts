import {Component, OnInit} from '@angular/core';
import {RendesVousService} from "../../../services/rendes-vous.service";
import {RendezvousResponse} from "../../../classes/RendezvousResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {GroupsServiceService} from "../../../services/groups-service.service";
import {EquipeRequirement} from "../../../classes/EquipeRequirement";
import {EtudiantService} from "../../../services/etudiant.service";
import {RemarqueResponse} from "../../../classes/RemarqueResponse";
import {Members} from "../../../classes/members";
import {SujetService} from "../../../services/sujet.service";
import {sujetRequirement} from "../../../classes/sujetRequirement";
import {SoutenanceService} from "../../../services/soutenance.service";
import {SoutenanceResponse} from "../../../classes/SoutenanceResponse";
import {EnseignantService} from "../../../services/enseignant.service";
import {JuryResponse} from "../../../classes/JuryResponse";

@Component({
  selector: 'app-dashboard-etudiant',
  templateUrl: './dashboard-etudiant.component.html',
  styleUrls: ['./dashboard-etudiant.component.css']
})
export class DashboardEtudiantComponent implements OnInit{


  rendezVouId!:string;

  equipeId!:string;
  driveLink!:string;
  sujetId!:string;
  sujet:sujetRequirement=new sujetRequirement();
  public  member!:Members[][];
  public rendezvousResponse:RendezvousResponse=new RendezvousResponse();
  public equipeRequire:EquipeRequirement=new EquipeRequirement();

  public remarqueResponse!:RemarqueResponse[];
  public juryResponse!:JuryResponse[];
  soutenance:SoutenanceResponse=new SoutenanceResponse();
  hasSout!:boolean;


  constructor(private rendesVous:RendesVousService,
              private etudiantService:EtudiantService,
              private group:GroupsServiceService,
              private sujetService:SujetService,
              private enseignantService:EnseignantService,
              private soutenanceService:SoutenanceService) {
  }

  public priseRendesVous(){
    this.rendesVous.priseRendesVous(0).subscribe(operation=>{
    },
      error => {
        alert(error.error.message);
      })
  }

  public voteRendezVous(vote:number){

    this.rendezvousResponse.idRendezvous=this.rendezVouId
    console.log(this.rendezvousResponse.idRendezvous)
    this.rendezvousResponse.vote=vote
    console.log(this.rendezvousResponse.vote)
    this.rendesVous.voteRendezvous(this.rendezvousResponse).subscribe(
      (response: RendezvousResponse) => {
        this.rendezvousResponse=response
      },(error:HttpErrorResponse)=>{
        alert(error.error.message);
    })
  }

  public getRendezVousBySelf(){
    this.rendesVous.getRendezvousBySelf().subscribe(res=>{
      this.rendezvousResponse=res
      this.rendezVouId=res.idRendezvous

    },error=>{
      alert(error.error.message);
    })
  }
  public addDriveLink(){

    this.equipeRequire.driveLink =this.driveLink

    this.group.addDriveLink(this.equipeRequire).subscribe((res:EquipeRequirement)=>{
      window.location.reload();
    },error=>{alert(error.error.message)})
  }

  public getEquipeBySelf(){

    this.group.getSelfEquipe().subscribe(res=>{
      this.getSujetById(res.sujetId)
      this.getMemebersOfEquipe(res.idEquipe)
      this.equipeRequire.idEquipe=res.idEquipe
    },error=>{
      alert(error.error.message);
    })
  }
  getMemebersOfEquipe(id:string){
    this.group.getMembersOfEquipe(id,this.member).subscribe(
      (operation:Members[][])=>{
        this.member=operation
      },error => {
        alert(error.error.message);
      })
  }
  getSujetById(id:string){
      this.sujetService.getSujetByIdSujet(id).subscribe((res:sujetRequirement)=>{
        this.sujet=res
        this.getEquipeByIdSujet(res.idSujet)
        this.getSoutenance(res.idSujet)
        this.getInvitedJury(res.idSujet)
      },(error:HttpErrorResponse)=>{
        alert(error.error.message)
      })
  }

  getEquipeByIdSujet(id:string){
    this.group.getEquipeByIdSujet(id).subscribe((res:EquipeRequirement)=>{
      this.equipeRequire=res;
    })
  }
  public hasSoutenance(){
    this.soutenanceService.hasSoutenance().subscribe(res=>{
      this.hasSout=res;
    },error=>{
      alert(error.error.message)
    })
  }

  public getSoutenance(id:string){
    this.soutenanceService.getSoutenanceByIdSujet(id).subscribe((res:SoutenanceResponse)=>{
      this.soutenance=res
    },error=>{
      alert(error.error.message)
    }
    )
  }
  public getInvitedJury(id:string){

    this.enseignantService.getInvitedJurys(id,0,6).subscribe((res:JuryResponse[])=>{
      this.juryResponse=res;

    },error=>{
      alert(error.error.message);
    });
  }
  ngOnInit(): void {
    this.getEquipeBySelf();
    this.getRendezVousBySelf();
    this.hasSoutenance()
  }


}

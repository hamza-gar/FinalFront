import {Component, OnInit} from '@angular/core';
import {RendesVousService} from "../../../services/rendes-vous.service";
import {RendezvousResponse} from "../../../classes/RendezvousResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {GroupsServiceService} from "../../../services/groups-service.service";
import {EquipeRequirement} from "../../../classes/EquipeRequirement";
import {EtudiantService} from "../../../services/etudiant.service";
import {RemarqueResponse} from "../../../classes/RemarqueResponse";

@Component({
  selector: 'app-dashboard-etudiant',
  templateUrl: './dashboard-etudiant.component.html',
  styleUrls: ['./dashboard-etudiant.component.css']
})
export class DashboardEtudiantComponent implements OnInit{


  rendezVouId!:string;

  equipeId!:string;
  driveLink!:string;
  public rendezvousResponse:RendezvousResponse=new RendezvousResponse();
  public equipeRequire:EquipeRequirement=new EquipeRequirement();

  public remarqueResponse!:RemarqueResponse[];
  constructor(private rendesVous:RendesVousService,
              private etudiantService:EtudiantService,
              private group:GroupsServiceService) {
  }

  public priseRendesVous(){
    this.rendesVous.priseRendesVous(0).subscribe(operation=>{

    },
      error => {
      alert("error");
      })
  }
  public voteRendezVous(vote:number){

    this.rendezvousResponse.idRendezvous=this.rendezVouId
    this.rendezvousResponse.vote=vote
    this.rendesVous.voteRendezvous(this.rendezvousResponse).subscribe(
      (response: RendezvousResponse) => {
        this.rendezvousResponse=response
      },(error:HttpErrorResponse)=>{
      alert(error.message)
    })
  }

  public getRendezVousBySelf(){
    this.rendesVous.getRendezvousBySelf().subscribe(res=>{
      this.rendezvousResponse=res
      this.rendezVouId=res.idRendezvous

      console.log(this.equipeId)
    },error=>{
      console.log(error.message)
    })
  }
  public addDriveLink(){
    this.equipeRequire.idEquipe=this.equipeId
    this.equipeRequire.driveLink =this.driveLink
    this.group.addDriveLink(this.equipeRequire).subscribe((res:EquipeRequirement)=>{

    },error=>{console.log(error)})
  }

  public getEquipeBySelf(){
    this.group.getSelfEquipe().subscribe(res=>{
      this.equipeId=res.idEquipe
      console.log(this.equipeId)
    },error=>{
      console.log(error.message)
    })
  }
  public getMyRemarque(){
    this.etudiantService.voiRemarque().subscribe((res:RemarqueResponse[])=>{
      this.remarqueResponse=res
    },error=>{(console.log(error))})
  }
  ngOnInit(): void {
  }

}

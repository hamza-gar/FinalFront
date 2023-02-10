import {Component, OnInit} from '@angular/core';
import {RendesVousService} from "../../../services/rendes-vous.service";
import {RendezvousResponse} from "../../../classes/RendezvousResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-dashboard-etudiant',
  templateUrl: './dashboard-etudiant.component.html',
  styleUrls: ['./dashboard-etudiant.component.css']
})
export class DashboardEtudiantComponent implements OnInit{

  selectedDate!:Date;

  rendezVouId!:string
  public rendezvousResponse:RendezvousResponse=new RendezvousResponse();
  constructor(private rendesVous:RendesVousService) {
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
    },error=>{
      console.log(error.message)
    })
  }
  ngOnInit(): void {
  }

}

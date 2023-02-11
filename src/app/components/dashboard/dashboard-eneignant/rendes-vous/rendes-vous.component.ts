import {Component, OnInit} from '@angular/core';
import {RendesVousService} from "../../../../services/rendes-vous.service";
import {HttpErrorResponse} from "@angular/common/http";
import {RendezvousResponse} from "../../../../classes/RendezvousResponse";
import {GroupsServiceService} from "../../../../services/groups-service.service";
import {EquipeRequirement} from "../../../../classes/EquipeRequirement";
import {Members} from "../../../../classes/members";

@Component({
  selector: 'app-rendes-vous',
  templateUrl: './rendes-vous.component.html',
  styleUrls: ['./rendes-vous.component.css']
})
export class RendesVousComponent implements OnInit{

  public renedsVous!:RendezvousResponse[];
  public renedsVousDate:RendezvousResponse = new RendezvousResponse();

  public equipe:EquipeRequirement= new EquipeRequirement();
  public p: number = 0;

  public  member!:Members[][];
  public selectedGroup:EquipeRequirement = new EquipeRequirement();
  constructor(private rendesVousService:RendesVousService,private groupService:GroupsServiceService) {
  }
  ngOnInit() {
    this.getRendesVous(this.p)

  }
  public getRendesVous(p:number):void{
    this.p = p;
    this.rendesVousService.getAllRendesVous(p,6).subscribe((operation:RendezvousResponse[])=>{
      console.log(operation)
      this.renedsVous=operation;

    },(error:HttpErrorResponse)=>{
      alert(error.message)
    })
  }
  public fixRendesVous(){
    console.log("date time :",this.renedsVousDate.dateRendezvous);
    this.rendesVousService.fixRendezvous(this.renedsVousDate).subscribe((response:RendezvousResponse)=>{
      this.renedsVousDate=response;
      console.log("id equipe :",this.renedsVousDate.idEquipe)
    },(error:HttpErrorResponse)=>{
      alert(error.message)
    })
  }


  myIndex(index:number){
    this.renedsVousDate = this.renedsVous[index];

  }

  public getEquipeById(id:string){
    this.groupService.getEquipeById(id).subscribe(
      (res:EquipeRequirement)=>{
        this.equipe=res
        this.selectedGroup = res
        console.log(res)
      },error => {alert(error.message)}
    )
  }
  getMemebersOfEquipe(index:number){
    this.renedsVousDate = this.renedsVous[index];
    console.log("id from rendes vous :",this.renedsVousDate.idEquipe)
    this.getEquipeById(this.renedsVousDate.idEquipe)
    console.log("this equipe id :" ,this.selectedGroup.idEquipe)
    this.groupService.getMembersOfEquipe(this.renedsVousDate.idEquipe,this.member).subscribe(
      (operation:Members[][])=>{
        this.member=operation
      },error => {
        console.log(error);
      })
  }

}

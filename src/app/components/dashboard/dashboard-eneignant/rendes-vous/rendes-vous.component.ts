import {Component, OnInit} from '@angular/core';
import {RendesVousService} from "../../../../services/rendes-vous.service";
import {HttpErrorResponse} from "@angular/common/http";
import {RendezvousResponse} from "../../../../classes/RendezvousResponse";

@Component({
  selector: 'app-rendes-vous',
  templateUrl: './rendes-vous.component.html',
  styleUrls: ['./rendes-vous.component.css']
})
export class RendesVousComponent implements OnInit{

  public renedsVous!:RendezvousResponse[];
  public renedsVousDate!:RendezvousResponse;
  public p: number = 0;
  constructor(private rendesVousService:RendesVousService) {
  }
  public getRendesVous(p:number):void{
    this.p = p;
    this.rendesVousService.getAllRendesVous(p,6).subscribe((response:RendezvousResponse[])=>{
      this.renedsVous=response;
    },(error:HttpErrorResponse)=>{
      alert(error.message)
    })
  }
  public fixRendesVous(){
    console.log("date time :",this.renedsVousDate.dateRendezvous);
    this.rendesVousService.fixRendezvous(this.renedsVousDate).subscribe((response:RendezvousResponse)=>{
      this.renedsVousDate=response;
    },(error:HttpErrorResponse)=>{
      alert(error.message)
    })
  }
  ngOnInit() {
    this.getRendesVous(this.p)
  }

  myIndex(index:number){

    this.renedsVousDate = this.renedsVous[index];
    console.log(this.renedsVousDate.idRendezvous);

  }
}

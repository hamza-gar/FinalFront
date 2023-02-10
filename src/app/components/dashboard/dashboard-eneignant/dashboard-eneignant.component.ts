import {Component, OnInit} from '@angular/core';
import {SujetService} from "../../../services/sujet.service";

import {TokenService} from "../../../services/token.service";
import {Router} from "@angular/router";
import {sujetRequirement} from "../../../classes/sujetRequirement";
import {RendesVousService} from "../../../services/rendes-vous.service";
import {RendezvousResponse} from "../../../classes/RendezvousResponse";

@Component({
  selector: 'app-dashboard-eneignant',
  templateUrl: './dashboard-eneignant.component.html',
  styleUrls: ['./dashboard-eneignant.component.css']
})
export class DashboardEneignantComponent implements OnInit{

  // selectedDate!:Date;
  // public rendesVousResponse!:RendezvousResponse;
  // constructor(private rendesVous:RendesVousService) {
  // }
  //
  // public fixRendesVous(){
  //   this.rendesVous.fixRendezvous(this.rendesVousResponse).subscribe(
  //     (operation:RendezvousResponse)=>{
  //       this.rendesVousResponse=operation;
  //     },error => {
  //       console.log(error);
  //     }
  //   )
  // }

  ngOnInit(): void {
  }
}

import {Component, OnInit} from '@angular/core';
import {RendesVousService} from "../../../services/rendes-vous.service";
import {RendezvousResponse} from "../../../classes/RendezvousResponse";

@Component({
  selector: 'app-dashboard-etudiant',
  templateUrl: './dashboard-etudiant.component.html',
  styleUrls: ['./dashboard-etudiant.component.css']
})
export class DashboardEtudiantComponent implements OnInit{

  selectedDate!:Date;
  public rendezvousResponse!:RendezvousResponse;
  constructor(private rendesVous:RendesVousService) {
  }

  public priseRendesVous(){
    this.rendesVous.priseRendesVous(0).subscribe(operation=>{
      // this.rendezvousResponse = operation
    },
      error => {
      alert("error");
      })
  }
  ngOnInit(): void {
  }

}

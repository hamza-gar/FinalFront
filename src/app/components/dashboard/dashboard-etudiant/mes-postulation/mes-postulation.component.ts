import {Component, OnInit} from '@angular/core';
import {SujetService} from "../../../../services/sujet.service";
import {sujetRequirement} from "../../../../classes/sujetRequirement";

@Component({
  selector: 'app-mes-postulation',
  templateUrl: './mes-postulation.component.html',
  styleUrls: ['./mes-postulation.component.css']
})
export class MesPostulationComponent implements OnInit{
  sujet!:sujetRequirement[];
  constructor(private sujetService:SujetService) {
  }

  ngOnInit(): void {
    this. getMyPostulations();
  }

  getMyPostulations() {
    console.log("getMyPostulations");
    this.sujetService.getMyPostulatedSujet(0, 6).subscribe(
      (response: sujetRequirement[]) => {
        this.sujet = response;
      },
      error => {
        alert(error.error.message);
      }
    );
  }

}

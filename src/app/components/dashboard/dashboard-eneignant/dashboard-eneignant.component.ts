import {Component, OnInit} from '@angular/core';
import {SujetService} from "../../../services/sujet.service";

import {TokenService} from "../../../services/token.service";
import {Router} from "@angular/router";
import {sujetRequirement} from "../../../classes/sujetRequirement";

@Component({
  selector: 'app-dashboard-eneignant',
  templateUrl: './dashboard-eneignant.component.html',
  styleUrls: ['./dashboard-eneignant.component.css']
})
export class DashboardEneignantComponent implements OnInit{

  public subjects: sujetRequirement = new sujetRequirement();

  nomSujet!:string;
  descriptionSujet!:string;
  tailleEquipe!:number;

  constructor(private sujetService: SujetService ,
              private tokenService:TokenService,
              private router:Router) {
  }


  public addSujet(){
    console.log(this.nomSujet)
    console.log(this.tailleEquipe)
    console.log(this.descriptionSujet)
    this.subjects.nomSujet=this.nomSujet;
    this.subjects.descriptionSujet=this.descriptionSujet;
    this.subjects.tailleEquipe=this.tailleEquipe
    this.sujetService.addSujet(this.subjects).subscribe(operation=>{
      console.log(operation)

    }, error=>{
      console.log('error')
    })
  }

  ngOnInit(): void {
    this.nomSujet=''
  }

}

import {Component, OnInit} from '@angular/core';
import {sujetRequirement} from "../../../../classes/sujetRequirement";
import {EquipeRequirement} from "../../../../classes/EquipeRequirement";
import {Members} from "../../../../classes/members";
import {SujetService} from "../../../../services/sujet.service";
import {TokenService} from "../../../../services/token.service";
import {GroupsServiceService} from "../../../../services/groups-service.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {RemarqueResponse} from "../../../../classes/RemarqueResponse";
import {EtudiantService} from "../../../../services/etudiant.service";

@Component({
  selector: 'app-voir-remarque',
  templateUrl: './voir-remarque.component.html',
  styleUrls: ['./voir-remarque.component.css']
})
export class VoirRemarqueComponent implements OnInit {

  remarqueResponse!:RemarqueResponse[];

  constructor(private sujetService: SujetService ,
              private tokenService:TokenService,
              private groupService:GroupsServiceService,
              private etudiantService:EtudiantService,
              private router:Router) {}

  public getMyRemarque(){
    this.etudiantService.voiRemarque().subscribe((res:RemarqueResponse[])=>{
      this.remarqueResponse=res
    },error=>{(console.log(error))})
  }
  ngOnInit(): void {
    this.getMyRemarque()

  }

}

import { Component } from '@angular/core';
import {sujetRequirement} from "../../../../classes/sujetRequirement";
import {EquipeRequirement} from "../../../../classes/EquipeRequirement";
import {SujetService} from "../../../../services/sujet.service";
import {GroupsServiceService} from "../../../../services/groups-service.service";
import {TokenService} from "../../../../services/token.service";
import {Router} from "@angular/router";
import {SoutenanceService} from "../../../../services/soutenance.service";
import {SoutenanceResponse} from "../../../../classes/SoutenanceResponse";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {HttpErrorResponse} from "@angular/common/http";
import {Members} from "../../../../classes/members";
import {RemarqueResponse} from "../../../../classes/RemarqueResponse";
import {EtudiantResponse} from "../../../../classes/EtudiantResponse";
import {EtudiantService} from "../../../../services/etudiant.service";

@Component({
  selector: 'app-jury-espace',
  templateUrl: './jury-espace.component.html',
  styleUrls: ['./jury-espace.component.css']
})
export class JuryEspaceComponent {

  public equipe:EquipeRequirement=new EquipeRequirement();

  public selectedItem!:sujetRequirement ;

  public soutenance!:SoutenanceResponse[];

  public  member!:Members[][];

  public etudiant!:Members[];

  public remarqueResponse:RemarqueResponse=new RemarqueResponse();

  public p:number = 0;

  public pages!: number[];

  public counter: number = 0;

  public remarque1!:string;
  public remarque2!:string;
  public remarque3!:string;
  public note1!:number;
  public note2!:number;
  public note3!:number;

  email!:string;

  public selectedSoutenance:SoutenanceResponse=new SoutenanceResponse();
  public etudiantResponse:EtudiantResponse=new EtudiantResponse();
  constructor(private sujetService: SujetService ,
              private groupeService:GroupsServiceService,
              private tokenService:TokenService,
              private soutenanceService:SoutenanceService,
              private etudiantService:EtudiantService,
              private router:Router) {}


  public getSoutenance(p:number){
    this.p=p;
    this.soutenanceService.getAllMineSoutenance(this.p,6).subscribe((response:SoutenanceResponse[])=>{

      this.soutenance=response;

    },error=>{console.log(error)})
  }


  public getCount(): void {
    this.sujetService.getSujetPages().subscribe(
      (response: number) => {
        this.counter = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addReamarque(){
    this.remarqueResponse.note=this.note1;
    this.remarqueResponse.remarque= this.remarque1
    this.remarqueResponse.idEtudiant=this.etudiantResponse.idEtudiant;
    this.remarqueResponse.target="rapport"
    this.soutenanceService.addRemarque(this.remarqueResponse).subscribe((response:boolean)=>{
      console.log(response);
    })

    this.remarqueResponse.note=this.note2;
    this.remarqueResponse.remarque= this.remarque2
    this.remarqueResponse.idEtudiant=this.etudiantResponse.idEtudiant;
    this.remarqueResponse.target="projet"
    this.soutenanceService.addRemarque(this.remarqueResponse).subscribe((response:boolean)=>{
      console.log(response);
    })

    this.remarqueResponse.note=this.note3;
    this.remarqueResponse.remarque= this.remarque3
    this.remarqueResponse.idEtudiant=this.etudiantResponse.idEtudiant;
    this.remarqueResponse.target="presentation"
    this.soutenanceService.addRemarque(this.remarqueResponse).subscribe((response:boolean)=>{
      console.log(response);
    })
  }
  myIndex(index:number){
    this.etudiant=this.member[index];
    console.log(this.etudiant[1])
    this.email=(this.etudiant[1]).toString()
    this.getEtudiantByEmail(this.email)
  }
  getEtudiantByEmail(email:string){
    this.etudiantService.getEtudiantByEmail(email).subscribe((res:EtudiantResponse)=>{
      this.etudiantResponse=res;
      console.log(this.etudiantResponse.idEtudiant ," :", this.etudiantResponse.email);
    })
  }
  getMemebersOfEquipe(id:string){
    this.groupeService.getMembersOfEquipe(id,this.member).subscribe(
      (operation:Members[][])=>{
        this.member=operation
      },error => {
        console.log(error);
      })
  }
  changePage(page: number) {
    this.getCount();
    console.log(Math.ceil( this.counter/ 6))
    if (page > 0) {
      this.p++;
    } else {
      this.p--;
    }
    if(this.p >= 0 && this.p <= (Math.ceil( this.counter/ 6)-1)){
      this.getSoutenance(this.p);
    }else{
      if(this.p < 0){
        this.p = 0;
      }else{
        this.p = Math.ceil( this.counter/ 6) - 1;
      }
    }
  }
  public getSoutenancePages(): void {
    this.sujetService.getSujetPages().subscribe(
      (response: number) => {
        this.pages = Array.from(Array(Math.ceil(response / 6)).keys());
        console.log(this.pages)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  ngOnInit() {
    if (this.p == undefined) {
      this.p = 0;
    }
    this.getCount();
    this.getSoutenance(this.p);
    this.getSoutenancePages();

  }



}

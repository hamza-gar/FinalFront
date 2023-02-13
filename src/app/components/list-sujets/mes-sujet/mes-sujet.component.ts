import {Component, OnInit} from '@angular/core';
import {sujetRequirement} from "../../../classes/sujetRequirement";
import {SujetService} from "../../../services/sujet.service";
import {TokenService} from "../../../services/token.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {GroupsServiceService} from "../../../services/groups-service.service";
import {EquipeRequirement} from "../../../classes/EquipeRequirement";
import {Members} from "../../../classes/members";

@Component({
  selector: 'app-mes-sujet',
  templateUrl: './mes-sujet.component.html',
  styleUrls: ['./mes-sujet.component.css']
})
export class MesSujetComponent implements OnInit{

  public subjects: sujetRequirement = new sujetRequirement();
  public lisSubjects!:sujetRequirement[];
  public fullEquipe!:EquipeRequirement[];

  public  member!:Members[][];

  nomSujet!:string;
  descriptionSujet!:string;
  tailleEquipe!:number;
  public p: number = 0;

  public pages!: number[];

  public counter: number = 0;

  constructor(private sujetService: SujetService ,
              private tokenService:TokenService,
              private groupService:GroupsServiceService,
              private router:Router) {}
  public selectedGroup!:EquipeRequirement;
  public selectedItem!:sujetRequirement ;

  myIndex(index:number){
    this.selectedItem = this.lisSubjects[index];
    console.log(this.selectedItem.idSujet);
    this.getFullEquipes();
  }

  public addSujet(){
    this.subjects.nomSujet=this.nomSujet;
    this.subjects.descriptionSujet=this.descriptionSujet;
    this.subjects.tailleEquipe=this.tailleEquipe
    this.sujetService.addSujet(this.subjects).subscribe(operation=>{
      window.location.reload();
    }, error=>{
      console.log('error')
    })

  }

  public getMySujets(p:number){
    this.p=p;
    this.sujetService.getMeSujet(this.p,6).subscribe((response:sujetRequirement[])=>{
      this.lisSubjects = response;
      console.log("id :",response);
    },error => {
      alert(error)
    })
  }
  ngOnInit(): void {
    if (this.p == undefined) {
      this.p = 0;
    }
    this.nomSujet = '';
    this.descriptionSujet = '';
    this.tailleEquipe = 0;
    this.getCount();
    this.getMySujets(this.p);
    this.getSujetPages();
    this.getFullEquipes();

    this.nomSujet=''
  }
  public getSujetPages(): void {
    this.sujetService.getMySujetPages().subscribe(
      (response: number) => {
        this.pages = Array.from(Array(Math.ceil(response / 6)).keys());
        console.log(this.pages)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getCount(): void {
    this.sujetService.getMySujetPages().subscribe(
      (response: number) => {
        this.counter = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

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
      this.getMySujets(this.p);
    }else{
      if(this.p < 0){
        this.p = 0;
      }else{
        this.p = Math.ceil( this.counter/ 6) - 1;
      }
    }
  }

  public getFullEquipes(){
    this.groupService.getAllFullEquipes(this.selectedItem.idSujet,this.p,6).subscribe(
      (response:EquipeRequirement[])=>{
        this.fullEquipe=response;
        console.log('hello :',this.fullEquipe)
      }, error => {console.log(error);});
  }

  getMemebersOfEquipe(){
    console.log("this equipe id :" ,this.selectedGroup.idEquipe)
    this.groupService.getMembersOfEquipe(this.selectedGroup.idEquipe,this.member).subscribe(
      (operation:Members[][])=>{
        this.member=operation
      },error => {
        console.log(error);
      })
  }

  getEquipeIndex(index:any){
    this.selectedGroup = this.fullEquipe[index]
    console.log(this.selectedGroup.idEquipe);
    console.log(this.fullEquipe[index].idEquipe);
  }

  lockSujet(){
    this.sujetService.lockSujet(0,this.selectedItem.idSujet,this.selectedGroup.idEquipe).subscribe(respone=>{

      console.log(respone);
    },error=>{
      console.log("error");
    })
  }

}

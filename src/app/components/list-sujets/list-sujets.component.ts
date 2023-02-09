import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {sujetRequirement} from "../../classes/sujetRequirement";
import {SujetService} from "../../services/sujet.service";
import {TokenService} from "../../services/token.service";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {EquipeRequirement} from "../../classes/EquipeRequirement";
import {GroupsServiceService} from "../../services/groups-service.service";

@Component({
  selector: 'app-list-sujets',
  templateUrl: './list-sujets.component.html',
  styleUrls: ['./list-sujets.component.css']
})
export class ListSujetsComponent implements OnInit {

  public subjects!: sujetRequirement[];
  public equipeRequirement !: EquipeRequirement[];

  public pages!: number[];

  public counter: number = 0;


  constructor(private sujetService: SujetService ,
              private groupeService:GroupsServiceService,
              private tokenService:TokenService,
              private router:Router) {
  }

  public selectedItem!:sujetRequirement ;

  public p: number = 0;
  pagination!: number;

  public isConnected(){
    if(this.tokenService.isValid())
      return true;
    return false;
  }
  public getSujets(p: number): void {
    console.log(this.subjects)
    this.p = p;
    this.sujetService.getSujets(p, 6).subscribe(
      (response: sujetRequirement[]) => {
        this.subjects = response;
        console.log("enseignant :",this.subjects[p].nomEnseignant)
        console.log(this.p)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  myIndex(index:number){
    this.selectedItem = this.subjects[index];
    console.log(this.selectedItem.idSujet);
    this.getEquipes();
  }
  public getEquipes() {

    this.groupeService.getEquipesOfSujet(this.selectedItem.idSujet, this.p, 10).subscribe(
      (response: EquipeRequirement[]) => {
        console.log(response);
        this.equipeRequirement = response;

      },
      (error: HttpErrorResponse) => {
        alert("error");
      }
    );
  }

  public getSujetPages(): void {
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

  changePage(page: number) {
    this.getCount();
    console.log(Math.ceil( this.counter/ 6))
    if (page > 0) {
      this.p++;
    } else {
      this.p--;
    }
    if(this.p >= 0 && this.p <= (Math.ceil( this.counter/ 6)-1)){
      this.getSujets(this.p);
    }else{
      if(this.p < 0){
        this.p = 0;
      }else{
        this.p = Math.ceil( this.counter/ 6) - 1;
      }
    }
  }

  ngOnInit() {
    if (this.p == undefined) {
      this.p = 0;
    }
    this.getCount();
    this.getSujets(this.p);
    this.getSujetPages();
    this.getEquipes();
  }




}

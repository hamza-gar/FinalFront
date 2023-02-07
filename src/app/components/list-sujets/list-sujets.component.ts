import { Component } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {sujetRequirement} from "../../classes/sujetRequirement";
import {SujetService} from "../../services/sujet.service";

@Component({
  selector: 'app-list-sujets',
  templateUrl: './list-sujets.component.html',
  styleUrls: ['./list-sujets.component.css']
})
export class ListSujetsComponent {

  public subjects!:sujetRequirement[];

  constructor(private sujetService:SujetService) {}
  p: number = 0;
  pagination!:number;



  public getSujets(): void {
    console.log(this.subjects)
    this.sujetService.getSujets(this.p,10).subscribe(
      (response: sujetRequirement[]) => {
        this.subjects = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }
  changePage(page: number) {
    this.p = page;
    console.log(this.p)
  }
  ngOnInit() {
    this.getSujets();
  }

}

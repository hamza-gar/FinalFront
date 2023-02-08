import {Component, OnInit} from '@angular/core';
import {EtudiantService} from "../../../services/etudiant.service";
import {TokenService} from "../../../services/token.service";
import {EtudiantResponse} from "../../../classes/EtudiantResponse";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-etudiant-settings',
  templateUrl: './etudiant-settings.component.html',
  styleUrls: ['./etudiant-settings.component.css']
})
export class EtudiantSettingsComponent implements OnInit{

  public etudiantResponse!:EtudiantResponse
  ngOnInit(): void {
    this.getEtudiant()
  }
constructor(private etudiantService:EtudiantService,private tokenService:TokenService) {
}

getEtudiant(){
    this.etudiantService.getEtudiant(this.tokenService.getId()).subscribe(
      (response: EtudiantResponse)=>{
        this.etudiantResponse =response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);}
    );
}

}

import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {TokenService} from "../../../services/token.service";
import {Router} from "@angular/router";
import {RemarqueResponse} from "../../../classes/RemarqueResponse";
import {EtudiantService} from "../../../services/etudiant.service";



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser = null;
  etudiant = false;
  mail: any;
  isworking!:boolean;
  hasfinished!:boolean;
  hassoutenance!:boolean;
  estpostulant!:boolean;
  settingsLink!:string;
  faString!:string;
  remarqueResponse!:RemarqueResponse[];
  constructor(private accountService: AccountService, private etudiantService:EtudiantService,private tokenService: TokenService, private route: Router) {
  }
  ngOnInit(): void {
    this.accountService.authStatus.subscribe(res => {
      this.etudiant = this.tokenService.isEtudiant();
      if(this.etudiant){
        this.settingsLink="/settings/etudiantSettings";
        this.faString="fa-solid fa-user-graduate"
      }else{
        this.settingsLink="/settings/enseignantSettings"
        this.faString="fa-solid fa-chalkboard-user"
      }
      this.isWorking();
      this.hasFinished();
      this.hasSoutenance();
      this.estPostulant();
      this.currentUser = this.tokenService.getInfo();
      this.mail = this.tokenService.getMail();
    })
  }
  logout() {
    this.tokenService.remove();
    this.accountService.changeStatus(false);
    this.route.navigateByUrl("/");

  }
  public getMyRemarque(){
    this.etudiantService.voiRemarque().subscribe((res:RemarqueResponse[])=>{
      this.remarqueResponse=res
    },error=>{(console.log(error))})
  }
  public isWorking() {
    this.etudiantService.isWorking().subscribe((res: boolean) => {
      this.isworking = res;
    }, error => {
      (console.log(error))
    })
  }
  public hasFinished() {
    this.etudiantService.hasFinished().subscribe((res: boolean) => {
      this.hasfinished = res;
    }, error => {
      (console.log(error))
    })
  }
  public hasSoutenance() {
    this.etudiantService.hasSoutenance().subscribe((res: boolean) => {
      this.hassoutenance = res;
    }, error => {
      (console.log(error))
    })
  }
  public estPostulant() {
    this.etudiantService.estPostulant().subscribe((res: boolean) => {
      this.estpostulant = res;
    }, error => {
      (console.log(error))
    })
  }
}

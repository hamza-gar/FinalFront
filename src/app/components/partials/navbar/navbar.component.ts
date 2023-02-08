import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {TokenService} from "../../../services/token.service";
import {Router} from "@angular/router";
import {UserType} from "../../../classes/UserType";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  currentUser=null;
  etudiant=false;
  constructor(private accountService:AccountService,private tokenService:TokenService,private route:Router) {
  }

  ngOnInit(): void {
    this.accountService.authStatus.subscribe(res=>{
      this.etudiant=this.tokenService.isEtudiant();
      this.currentUser=this.tokenService.getInfo();
    })
  }

  logout(){
    this.tokenService.remove();
    this.accountService.changeStatus(false);
    this.route.navigateByUrl("/");

  }

}

import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {TokenService} from "../../../services/token.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  currentUser=null;
  constructor(private accountService:AccountService,private tokenService:TokenService,private route:Router) {
  }

  ngOnInit(): void {
    this.accountService.authStatus.subscribe(res=>{this.currentUser=this.tokenService.getInfo();})

  }
  logout(){
    this.tokenService.remove();
    this.accountService.changeStatus(false);
    this.route.navigateByUrl("/");

  }

}

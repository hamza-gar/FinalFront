import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from "../services/token.service";
import {AccountService} from "../services/account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenservice:TokenService,private accountservice:AccountService , private router:Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(!this.tokenservice.loggedIn()){
      this.tokenservice.remove();
      this.accountservice.changeStatus(false);
      this.router.navigateByUrl('/login');
    return false;
    }
    return true;
  }

}

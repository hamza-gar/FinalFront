import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenService} from "../services/token.service";


@Injectable({
  providedIn: 'root'
})
export class AfterAuthGuard implements CanActivate {
  constructor(private tokenservice:TokenService, private router:Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.tokenservice.loggedIn()){
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }

}

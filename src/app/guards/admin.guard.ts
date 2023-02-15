import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from "../services/token.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private tokenService:TokenService,private router:Router,private token:TokenService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    if(this.tokenService.isAdmin()){
    return true;
  }else if (this.tokenService.isEtudiant()){
      this.router.navigate(['/dashboard/etudiant/monSujet']);
      return false;
    }else {
      this.router.navigate(['/dashboard/home/mesSujets']);
      return false;
    }
  }

}

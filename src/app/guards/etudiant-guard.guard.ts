import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from "../services/token.service";
import {AccountService} from "../services/account.service";

@Injectable({
  providedIn: 'root'
})
export class EtudiantGuardGuard implements CanActivate {
  constructor(private tokenservice:TokenService, private router:Router, private accountservice:AccountService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isEtudiant = this.tokenservice.isEtudiant();
    if (isEtudiant) {
      return true;
    } else {
      this.router.navigate(['/dashboard/home/mesSujets']);
      return false;
    }
  }

}

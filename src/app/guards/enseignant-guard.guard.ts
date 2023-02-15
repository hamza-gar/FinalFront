import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from "../services/token.service";
import {AccountService} from "../services/account.service";

@Injectable({
  providedIn: 'root'
})
export class EnseignantGuardGuard implements CanActivate {
  constructor(private tokenservice:TokenService, private router:Router, private accountservice:AccountService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isEnseignant = this.tokenservice.isEtudiant();
    if (!isEnseignant) {
      return true;
    } else {
      this.router.navigate(['/dashboard/etudiant/monSujet']); // redirect to etudiant dashboard
      return false;
    }
  }

}

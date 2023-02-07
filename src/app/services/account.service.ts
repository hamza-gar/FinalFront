import { Injectable } from '@angular/core';
import {TokenService} from "./token.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor(private tokenService:TokenService) {
  }
  private loggedIn = new BehaviorSubject<boolean>(this.tokenService.isValid());

  authStatus=this.loggedIn.asObservable();

  changeStatus(value:boolean){
    this.loggedIn.next(value);
  }

}

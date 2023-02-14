import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomaineResponse} from "../classes/DomaineResponse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  addDomaine(domaine:DomaineResponse):Observable<DomaineResponse>{
    return this.http.post<DomaineResponse>("http://localhost:8080/admins/domaines",domaine)
  }
}

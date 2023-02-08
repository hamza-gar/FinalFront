import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EnseignantResponse} from "../classes/RemarqueResponse";
import {enseignantSignUp} from "../classes/enseignantSignUp";


@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  enseignantUrl = "http://localhost:8080/enseignants"
  constructor(private httpClient:HttpClient) {}

  public getEnseignant(id:any): Observable<enseignantSignUp> {
    return this.httpClient.get<enseignantSignUp>(`${this.enseignantUrl}/${id}`);
  }

  public updateEnseignant(up:any,id:any):Observable<enseignantSignUp>{
    return this.httpClient.put<enseignantSignUp>(`${this.enseignantUrl}/${id}`,up);
  }
}

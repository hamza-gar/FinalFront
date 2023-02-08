import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {enseignantSignUp} from "../classes/enseignantSignUp";
import {etudiantSignUp} from "../classes/etudiantSignUp";
import {FiliereResponse} from "../classes/FiliereResponse";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  etudiantUrl = "http://localhost:8080/etudiants"
  constructor(private httpClient:HttpClient) {}

    signupEtudiant(sign : etudiantSignUp):Observable<Object>{
    console.log(sign)
    return this.httpClient.post(`${this.etudiantUrl}`,sign);
  }

  enseignantsUrl = "http://localhost:8080/enseignants"

  signupEnseignant(sign: enseignantSignUp): Observable<Object> {
    console.log(sign)
    return this.httpClient.post(`${this.enseignantsUrl}`, sign);
  }
  filierUrl = "http://localhost:8080/filieres"
  public getNomFiliere(page: number, limit: number):Observable<FiliereResponse[]>{

    return this.httpClient.get<FiliereResponse[]>(`${this.filierUrl}?page=${page}&limit=${limit}`);
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  etudiantUrl = "http://localhost:8080/etudiants/login"
  constructor(private httpClient:HttpClient) {}

  loginEtudiant(logs : { email:string,password:string }){
    return this.httpClient.post(`${this.etudiantUrl}`,logs);
  }
  enseignantUrl = "http://localhost:8080/enseignants/login"

  loginEnseignant(logs : { email:string,password:string }){
    return this.httpClient.post(`${this.enseignantUrl}`,logs);
  }

}

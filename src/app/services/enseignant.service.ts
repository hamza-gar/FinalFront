import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {enseignantSignUp} from "../classes/enseignantSignUp";
import {JuryResponse} from "../classes/JuryResponse";


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
  public getAllEnseignant(page: number, limit: number):Observable<enseignantSignUp[]>{
    return this.httpClient.get<enseignantSignUp[]>(`${this.enseignantUrl}?page=${page}&limit=${limit}`);
  }
  juryUrl = "http://localhost:8080/jurys"

  getInvitedJurys(idSujet: string, page: number, limit: number): Observable<JuryResponse[]> {
    return this.httpClient.get<JuryResponse[]>(`${this.juryUrl}/invites/${idSujet}?page=${page}&limit=${limit}`);
  }



  public getAllEnseignantToInvite(page: number, limit: number):Observable<enseignantSignUp[]>{
    return this.httpClient.get<enseignantSignUp[]>(`http://localhost:8080/jurys/jurys?page=${page}&limit=${limit}`);
  }

}

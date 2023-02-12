import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EtudiantResponse} from "../classes/EtudiantResponse";
import {RemarqueResponse} from "../classes/RemarqueResponse";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  etudiantUrl = "http://localhost:8080/etudiants"
  constructor(private httpClient:HttpClient) {}

  public getEtudiant(id:any): Observable<EtudiantResponse> {
    return this.httpClient.get<EtudiantResponse>(`${this.etudiantUrl}/${id}`);
  }

  public updateEtudiant(up:any,id:any):Observable<EtudiantResponse>{
    return this.httpClient.put<EtudiantResponse>(`${this.etudiantUrl}/${id}`,up);
  }

  public getEtudiantByEmail(email:string):Observable<EtudiantResponse>{
    return this.httpClient.get<EtudiantResponse>(`${this.etudiantUrl}/byEmail/${email}`);
  }
  public voiRemarque():Observable<RemarqueResponse[]>{
    return this.httpClient.get<RemarqueResponse[]>(`${this.etudiantUrl}/voirremarque`);
  }
}

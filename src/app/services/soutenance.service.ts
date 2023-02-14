import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SoutenanceResponse} from "../classes/SoutenanceResponse";
import {Observable} from "rxjs";
import {RemarqueResponse} from "../classes/RemarqueResponse";

@Injectable({
  providedIn: 'root'
})
export class SoutenanceService {
  private apiServiceUrl='http://localhost:8080/soutenances';
  constructor(private http:HttpClient) {
  }
  public addSoutenance(soutenanceResponse:SoutenanceResponse,idSujet:string):Observable<SoutenanceResponse>{
    return this.http.post<SoutenanceResponse>(`${this.apiServiceUrl}`,soutenanceResponse, {
      params: { idSujet: idSujet }});
  }

  public inviteJury(soutenanceResponse:SoutenanceResponse, emailEnseignant:string, roleJury:string) {
    let params = new HttpParams();
    params = params.append('emailEnseignant', emailEnseignant);
    params = params.append('roleJury', roleJury);

    return this.http.put<boolean>(`${this.apiServiceUrl}/invite`, soutenanceResponse, { params });
  }

  public updateDateSoutenance(soutenanceResponse:SoutenanceResponse):Observable<SoutenanceResponse>{
    return this.http.put<SoutenanceResponse>(`${this.apiServiceUrl}/date-update`,soutenanceResponse);
  }

  public getSoutenanceByIdSujet(idSujet:string):Observable<SoutenanceResponse>{
    return this.http.get<SoutenanceResponse>(`${this.apiServiceUrl}/ofsujet?idSujet=${idSujet}`);
  }

  public getAllMineSoutenance(page: number, limit: number):Observable<SoutenanceResponse[]>{
    return this.http.get<SoutenanceResponse[]>(`${this.apiServiceUrl}/mine?page=${page}&limit=${limit}`);
  }

  public addRemarque(remarqueResponse:RemarqueResponse):Observable<boolean>{
    return this.http.post<boolean>(`http://localhost:8080/jurys/add-remarque`,remarqueResponse);
  }

  public updateSoutenance(soutenanceResponse:SoutenanceResponse):Observable<SoutenanceResponse>{
    return this.http.put<SoutenanceResponse>(`${this.apiServiceUrl}/date-update`,soutenanceResponse);
  }
  public hasSoutenance():Observable<boolean>{
    return this.http.get<boolean>(`http://localhost:8080/etudiants/hasSoutenance`);
  }

}

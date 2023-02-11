import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SoutenanceResponse} from "../classes/SoutenanceResponse";
import {Observable} from "rxjs";

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

}

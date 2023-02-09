import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EquipeRequirement} from "../classes/EquipeRequirement";
import { Observable } from 'rxjs';
import {Members} from "../classes/members";

@Injectable({
  providedIn: 'root'
})
export class GroupsServiceService {

  private equipeUrl ='http://localhost:8080/equipes';
  constructor(private http: HttpClient) { }

  public getEquipesOfSujet(id: string, page: number, limit: number): Observable<EquipeRequirement[]> {

    return this.http.get<EquipeRequirement[]>(`${this.equipeUrl}/sujets/${id}?page=${page}&limit=${limit}`);
  }

  public joinEquipe(Equipe:EquipeRequirement):Observable<EquipeRequirement>{
      return this.http.put<EquipeRequirement>(`${this.equipeUrl}/join`,Equipe);
  }

  public createGroup(equipe:EquipeRequirement):Observable<EquipeRequirement>{
    return this.http.post<EquipeRequirement>(`${this.equipeUrl}`,equipe);
  }

  public getMembersOfEquipe(idEquipe:string,member:Members[][]):Observable<Members[][]>{
    return this.http.get<Members[][]>(`${this.equipeUrl}/get-members?idEquipe=${idEquipe}`)
  }

}

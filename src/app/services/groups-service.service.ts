import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EquipeRequirement} from "../classes/EquipeRequirement";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsServiceService {

  private equipeUrl ='http://localhost:8080/equipes';
  constructor(private http: HttpClient) { }

  public getEquipesOfSujet(id: string, page: number, limit: number): Observable<EquipeRequirement[]> {

    return this.http.get<EquipeRequirement[]>(`${this.equipeUrl}/sujets/${id}?page=${page}&limit=${limit}`);
  }

}

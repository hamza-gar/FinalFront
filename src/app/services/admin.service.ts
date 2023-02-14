import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AddDomaineResponse} from "../classes/AddDomaineResponse";


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  addDomaine(domaine:AddDomaineResponse):Observable<AddDomaineResponse>{
    return this.http.post<AddDomaineResponse>("http://localhost:8080/admins/domaines",domaine)
  }
  getDomaines(page: number, limit: number):Observable<AddDomaineResponse[]>{
    return this.http.get<AddDomaineResponse[]>(`http://localhost:8080/domaines?page=${page}&limit=${limit}`)
  }

  deleteDomaine(id:number):Observable<AddDomaineResponse>{
    return this.http.delete<AddDomaineResponse>(`http://localhost:8080/domaines/${id}`)
  }

  updateDomaine(id:number,domaine:AddDomaineResponse):Observable<AddDomaineResponse>{
    return this.http.put<AddDomaineResponse>(`http://localhost:8080/domaines/${id}`,domaine)
  }
}

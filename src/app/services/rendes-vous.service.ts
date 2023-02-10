import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RendezvousResponse} from "../classes/RendezvousResponse";

@Injectable({
  providedIn: 'root'
})
export class RendesVousService {
  rendesVousUrl = "http://localhost:8080/rendezvous"
  constructor(private httpClient:HttpClient) {}

  public priseRendesVous(id:any):Observable<RendezvousResponse>{
    return this.httpClient.post<RendezvousResponse>(`${this.rendesVousUrl}`,id);
  }

  public fixRendezvous(rendezvousResponse:RendezvousResponse):Observable<RendezvousResponse>{
    return this.httpClient.put<RendezvousResponse>(`${this.rendesVousUrl}/fix`,rendezvousResponse);
  }

  public getAllRendesVous(page: number, limit: number):Observable<RendezvousResponse[]>{
    return this.httpClient.get<RendezvousResponse[]>(`${this.rendesVousUrl}?page=${page}&limit=${limit}`);
  }

  public voteRendezvous(id:any):Observable<RendezvousResponse>{
    return this.httpClient.put<RendezvousResponse>(`${this.rendesVousUrl}/vote`,id);
  }
  public getRendezvousBySelf():Observable<RendezvousResponse>{
    return this.httpClient.get<RendezvousResponse>(`${this.rendesVousUrl}/self`);
  }
}

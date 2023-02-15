import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EtudiantResponse} from "../classes/EtudiantResponse";
import {RemarqueResponse} from "../classes/RemarqueResponse";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  etudiantUrl = "http://localhost:8080/etudiants"

  constructor(private httpClient: HttpClient) {
  }

  public getEtudiant(id: any): Observable<EtudiantResponse> {
    return this.httpClient.get<EtudiantResponse>(`${this.etudiantUrl}/${id}`);
  }

  public updateEtudiant(up: any, id: any): Observable<EtudiantResponse> {
    return this.httpClient.put<EtudiantResponse>(`${this.etudiantUrl}/${id}`, up);
  }

  public getEtudiantByEmail(email: string): Observable<EtudiantResponse> {
    return this.httpClient.get<EtudiantResponse>(`${this.etudiantUrl}/byEmail/${email}`);
  }

  public voiRemarque(page: number, limit: number): Observable<RemarqueResponse[]> {
    return this.httpClient.get<RemarqueResponse[]>(`${this.etudiantUrl}/voirremarque?page=${page}&limit=${limit}`);
  }

  public getRemarqueCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.etudiantUrl}/countremarque`);
  }

  public isWorking(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.etudiantUrl}/isWorking`);
  }

  public hasFinished(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.etudiantUrl}/hasFinished`);
  }

  public hasSoutenance(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.etudiantUrl}/hasSoutenance`);
  }

  public estPostulant(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.etudiantUrl}/estpostulant`);
  }


}

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {sujetRequirement} from "../classes/sujetRequirement";
import {UniversityResponse} from "../classes/UniversityResponse";
import {EtablissementResponse} from "../classes/EtablissementResponse";


@Injectable({
  providedIn:'root'
})
export class SujetService{
  private apiServiceUrl='http://localhost:8080/sujets';


  constructor(private http:HttpClient) {
  }
  public getSujets(page: number, limit: number): Observable<sujetRequirement[]> {
    console.log(`${this.apiServiceUrl}?page=${page}&limit=${limit}`);
    return this.http.get<sujetRequirement[]>(`${this.apiServiceUrl}?page=${page}&limit=${limit}`);
  }

  public getSujetPages(): Observable<number> {
    return this.http.get<number>(`${this.apiServiceUrl}/count`);
  }

  public getMySujetPages(): Observable<number> {
    return this.http.get<number>(`${this.apiServiceUrl}/countMysujets`);
  }
  public addSujet(sujet:sujetRequirement):Observable<sujetRequirement>{
  return this.http.post<sujetRequirement>(`${this.apiServiceUrl}`,sujet);
  }

  getMeSujet(page: number, limit: number):Observable<sujetRequirement[]>{
    return this.http.get<sujetRequirement[]>(`${this.apiServiceUrl}/posted?page=${page}&limit=${limit}`);
  }
  lockSujet(id:any,idSujet:any,idEquipe:any):Observable<any>{
    return this.http.put(`${this.apiServiceUrl}/lock?idSujet=${idSujet}&idEquipe=${idEquipe}`,id);
  }
  validateSujet(sujet:sujetRequirement):Observable<sujetRequirement>{
    return this.http.put<sujetRequirement>(`${this.apiServiceUrl}/validate`,sujet);
  }
  getMyLockedSujets(page: number, limit: number):Observable<sujetRequirement[]>{
    return this.http.get<sujetRequirement[]>(`${this.apiServiceUrl}/mylocked?page=${page}&limit=${limit}`)
  }
  getMyLockedSujetsCount():Observable<number>{
    return this.http.get<number>(`${this.apiServiceUrl}/mylockedcount`)
  }
  getSujetByIdSujet(idSujet:string):Observable<sujetRequirement>{
    return this.http.get<sujetRequirement>(`${this.apiServiceUrl}/${idSujet}`)
  }

  public getUniversity():Observable<UniversityResponse[]>{
    return this.http.get<UniversityResponse[]>(`http://localhost:8080/etablissements/universites`);
  }

  public getAllEtablissementByIdUniversity(university:UniversityResponse):Observable<EtablissementResponse[]>{
    return this.http.post<EtablissementResponse[]>(`http://localhost:8080/etablissements/byUniversite`,university)
  }
  getAllSujetsFiltered(page: number, limit: number, universite?: string, etablissement?: string, departement?: string) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (universite) {
      params = params.set('universite', universite);
    }

    if (etablissement) {
      params = params.set('etablissement', etablissement);
    }

    if (departement) {
      params = params.set('departement', departement);
    }

    return this.http.get<sujetRequirement[]>(`${this.apiServiceUrl}/filtered`, { params });
  }

  getCountAllSujetsFiltered(universite?: string, etablissement?: string, departement?: string) {
    let params = new HttpParams();

    if (universite) {
      params = params.set('universite', universite);
    }

    if (etablissement) {
      params = params.set('etablissement', etablissement);
    }

    if (departement) {
      params = params.set('departement', departement);
    }

    return this.http.get<number>(`${this.apiServiceUrl}/countFiltered`, { params });
  }

  getMyPostulatedSujet(page: number, limit: number): Observable<sujetRequirement[]> {
    return this.http.get<sujetRequirement[]>(`${this.apiServiceUrl}/myPostulated?page=${page}&limit=${limit}`);
  }

}

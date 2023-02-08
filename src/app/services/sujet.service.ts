import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {sujetRequirement} from "../classes/sujetRequirement";


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

}

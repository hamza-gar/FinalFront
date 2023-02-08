import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  emailVerificationUrl = "http://localhost:8080/forgotPassword"
  constructor(private httpClient:HttpClient) {}

  public VerifyEmail(re:{email: string}):Observable<Object>{
    console.log(re)
    return this.httpClient.post(`${this.emailVerificationUrl}`,re);
  }

  private header!: HttpHeaders;
  verifyKeyUrl = "http://localhost:8080/forgotPassword/checkKey"

  public checkKey(email: string, key: string) {
    const passwordHelperRequest = { email, key };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.header=headers;
    return this.httpClient.post<any>(this.verifyKeyUrl, passwordHelperRequest, { headers });
  }

  UpdatePasswordUrl = "http://localhost:8080/forgotPassword/updatePass"

  changePassword(email: string, password: string, token: string): Observable<any> {
    const passwordHelperRequest = { email, password };
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put<any>(this.UpdatePasswordUrl, passwordHelperRequest, { headers });
  }

}

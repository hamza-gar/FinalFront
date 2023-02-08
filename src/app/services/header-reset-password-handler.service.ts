import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeaderResetPasswordHandlerService {

  private header!: HttpHeaders;

  setHeaders(header: HttpHeaders) {
    this.header = header;
  }

  getHeader() {
    return this.header;
  }
}

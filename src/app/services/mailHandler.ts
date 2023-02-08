import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailHandler {
  private email!: string;

  setMail(email: string) {
    this.email = email;
  }

  getMail() {
    return this.email;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  set (data:any){
    localStorage.setItem('token',data.token);
    localStorage.setItem('id',data.id);
    localStorage.setItem('user',data.user);
    localStorage.setItem('mail',data.mail);
  }

  handle(data:any){
    this.set(data);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getId(){
    return localStorage.getItem('id');
  }

  getUser(){
    return localStorage.getItem('user');
  }

  getMail(){
    return localStorage.getItem('mail');
  }

  remove(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('user');
    localStorage.removeItem('mail');
  }
  decode(payload:any){
    console.log('payload : ', payload)
    return JSON.parse(atob(payload))
  }
  payload(token:any){
    const payload = token.split('.')[1];
    console.log('payload : ', payload)
    return this.decode(payload);
  }
  isValid(){
    const token = this.getToken()
    const id = this.getId()
    if(token){
      const payload = this.payload(token)
      if (payload){
        return id==payload.id;
      }
    }
    return false;
  }
  getInfo(){
    const token = this.getToken()
    if(token){
      const payload=this.payload(token)
      return payload?payload:null
    }
    return null
  }

  isEtudiant(){
    const user = this.getUser()
    return user=='etudiant'
  }
  isAdmin(){
    const user = this.getUser()
    return user=='admin'
  }

  loggedIn(){
    return this.isValid()
  }

}

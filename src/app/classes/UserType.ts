import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserType{
  type !: boolean;


  setType(type:boolean){
    this.type=type;
  }
  getType(){
    return this.type;
  }
}

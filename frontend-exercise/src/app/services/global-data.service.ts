import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService 
{
  myToken: any;

  user:any;

  constructor()
  {
    this.myToken = null;
    // alert("set myToken from global service to null")
  }

  getMyToken()
  {
    return this.myToken;
  }

  setMyToken(data: any)
  {
    this.myToken = data;
  }

  setUser(userData:any)
  {
    this.user=userData;
  }
  
  getUser()
  {
    return this.user;
  }

}

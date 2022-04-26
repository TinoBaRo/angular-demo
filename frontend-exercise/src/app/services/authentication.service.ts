import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RouterService} from "./router.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService 
{
  constructor(private httpcli: HttpClient, private routerService: RouterService) 
  {
  }


  addUser(user: any) : Observable<any>
  {
    return this.httpcli.post("https://reqres.in/api/register", user);
  }
  
  loginUser(user:any) : Observable<any>
  {
    return this.httpcli.post("https://reqres.in/api/login", user);
  }



}

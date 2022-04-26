import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { GlobalDataService } from '../services/global-data.service';
import { RouterService } from '../services/router.service';

@Injectable({
  providedIn: 'root'
})
export class AuthCanActivateGuard implements CanActivate 
{
  constructor(private authService: AuthenticationService, private routeService: RouterService,
    private globalService: GlobalDataService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    let myToken = this.globalService.getMyToken();
    // alert(myToken)

    if (myToken == null) 
    {
      this.routeService.openLogin();

      return false;
    }

    return true;
  }
  
}

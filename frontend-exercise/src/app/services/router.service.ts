import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private route: Router) {
  }


  openLogin() {
    this.route.navigate(['login'])
  }

  openRegister() {

    this.route.navigate(['register'])
  }

  openManage() {
    this.route.navigate(['manage']);
  }

  openUsers() {
    this.route.navigate(['users']);
  }
}

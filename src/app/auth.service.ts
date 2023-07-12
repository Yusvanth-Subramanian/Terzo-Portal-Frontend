import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private router:Router) { }
  isLoggedIn(): boolean {
    const jwtToken = localStorage.getItem('jwtToken');
    return !!jwtToken;
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('refreshToken');
  }

}

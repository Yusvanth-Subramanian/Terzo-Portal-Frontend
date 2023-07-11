import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn(): boolean {
    const jwtToken = localStorage.getItem('jwtToken');
    return !!jwtToken;
  }

  logout() {
    localStorage.removeItem('jwtToken');
  }
}

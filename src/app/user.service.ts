import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const loginData = {
      email: email,
      password: password
    };
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  getEmployees(startIndex: number, endIndex: number): Observable<any> {
    const url = `${this.baseUrl}/get-employees/${startIndex}/${endIndex}`;
    console.log(this.http.get<any>(url));
    return this.http.get<any>(url);
  }
}

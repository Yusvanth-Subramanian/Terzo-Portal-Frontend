import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  getEmployees(): Observable<any> {
    const url = `${this.baseUrl}/get-employees`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  loadUpcomingHolidays(): Observable<any> {
    const url = `${this.baseUrl}/get-holidays`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  loadUpcomingTimeOffs() {
    const url = `${this.baseUrl}/get-user-timeoffs`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    console.log(headers);
    return this.http.get<any>(url, { headers });
  }

  loadBirthdayBuddies() {
    const url = `${this.baseUrl}/get-birthday-buddies`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  loadWorkAnniversaries() {
    const url = `${this.baseUrl}/get-work-anniversary-list`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  loadNewHires() {
    const url = `${this.baseUrl}/get-new-hires`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }


  applyLeave(leaveData: { fromDate: DateConstructor; note: string; typeOfLeave: string; toDate: DateConstructor }) {
    const url = `${this.baseUrl}/apply-leave`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.post<any>(url, leaveData,{ headers });
  }
}

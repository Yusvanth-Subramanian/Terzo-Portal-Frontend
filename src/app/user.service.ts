import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {UpdateCurrentUserDetails} from "./update-current-user-details.model";
import {UnapprovedLeaves} from "./unapproved-leaves.model";
import {AdminUpdateUserDTO} from "./admin-update-user-dto.model";
import {User} from "./user.model";
import {AddUserDTO} from "./add-user-dto.model";
import {AddHolidayDTO} from "./add-holiday-dto.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080';

  check = new Subject<any>();

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const loginData = {
      email: email,
      password: password
    };
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  getEmployees(start:number,end:number,type:string,query:string,search:string): Observable<any> {
    console.log(search)
    if(search===" "){
      search="null";
    }
    console.log(search)
    const url = `${this.baseUrl}/get-employees/${start}/${end}/${type}/${query}/${search}`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  loadUpcomingHolidays(): Observable<any> {
    const url = `${this.baseUrl}/get-holidays`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  loadUpcomingTimeOffs() {
    const url = `${this.baseUrl}/get-user-timeoffs`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    console.log(headers);
    return this.http.get<any>(url, { headers });
  }

  loadBirthdayBuddies() {
    const url = `${this.baseUrl}/get-birthday-buddies`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  loadWorkAnniversaries() {
    const url = `${this.baseUrl}/get-work-anniversary-list`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  loadNewHires() {
    const url = `${this.baseUrl}/get-new-hires`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }


  applyLeave(leaveData: { fromDate: DateConstructor; note: string; typeOfLeave: string; toDate: DateConstructor }) {
    const url = `${this.baseUrl}/apply-leave`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.post<any>(url, leaveData,{ headers });
  }

  getUserProfile() {
    const url = `${this.baseUrl}/get-employee/details`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  updateUser(updatedUser: UpdateCurrentUserDetails,id:number,email:string) {
    // console.log("in service "+updatedUser);

     updatedUser.id=id;
     updatedUser.email=email;
    console.log(updatedUser);
    const url = `${this.baseUrl}/update`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.put<any>(url, updatedUser,{ headers });
  }

  getUnApprovedLeaves() {
    const url = `${this.baseUrl}/get-user-unapproved-leaves`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  deleteLeave(id: number) {
    const url = `${this.baseUrl}/delete-leave/${id}`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.delete<any>(url, { headers });
  }

  saveLeave(leave: UnapprovedLeaves) {
    const url = `${this.baseUrl}/update-leave`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.put<any>(url,leave, { headers });
  }

  saveUserChanges(user: AdminUpdateUserDTO) {
    const url = `${this.baseUrl}/update-user`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.put<any>(url,user, { headers });
  }


  deleteUser(user: User) {
    const url = `${this.baseUrl}/delete-user?id=${user.id}`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.delete<any>(url, { headers });
  }

  loadManagers() {
    const url = `${this.baseUrl}/get-managers`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  saveUser(user: AddUserDTO) {
    console.log(user);
    const url = `${this.baseUrl}/save-user`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.post<any>(url,user, { headers });
  }

  loadUnapprovedLeaves() {
    const url = `${this.baseUrl}/get-unapproved-leaves`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  approvedLeave(leave:UnapprovedLeaves) {
    const url = `${this.baseUrl}/approve-leave?id=${leave.id}`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  disApprovedLeave(leave: UnapprovedLeaves) {
    const url = `${this.baseUrl}/disapprove-leave?id=${leave.id}`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  generateOTP(email: any) {
    const url = `${this.baseUrl}/generate-otp?email=${email}`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  verifyOTP(otp: string,email:string) {
    const body={otp,email}
    console.log("body")
    console.log(body)
    const url = `${this.baseUrl}/check-otp`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.post<any>(url,body, { headers });
  }

  changePassword(changePasswordRequest: {
    forForgotPassword: boolean;
    oldPassword: any;
    newPassword: any;
    email: any
  }) {
    console.log("last dto")
    console.log(changePasswordRequest)
    const url = `${this.baseUrl}/change-password`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.post<any>(url,changePasswordRequest, { headers });
  }

  getTotalUsers() {
    const url = `${this.baseUrl}/get-total-users`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  loadTeams() {
    const url = `${this.baseUrl}/get-all-teams`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  loadDepartments() {
    const url = `${this.baseUrl}/get-all-departments`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  loadRoles() {
    const url = `${this.baseUrl}/get-all-roles`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  getCalenderData() {
    const url = `${this.baseUrl}/get-calendar-data`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.get<any>(url, { headers });
  }

  addHoliday(holiday: AddHolidayDTO) {
    const url = `${this.baseUrl}/add-holiday`;
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `${jwtToken}`);
    return this.http.post<any>(url, holiday,{ headers });
  }
}

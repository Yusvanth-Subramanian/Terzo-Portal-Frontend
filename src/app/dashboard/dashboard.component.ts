import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {User} from "../user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  userProfileIcon: string ="";
  users: User[] = [];
  currentPage: number = 0;
  pageSize: number = 2;
  totalUsers: number = 0;
  totalPages: number = 0;

  constructor(private authService: AuthService, private userService: UserService,private router:Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize - 1;

    this.userService.getEmployees(startIndex, endIndex)
      .subscribe(
        response => {
          if (response.status === 'OK') {
            this.users = response.data;
            this.totalUsers = this.users.length;
            this.totalPages = Math.ceil(this.totalUsers / this.pageSize);
          } else {
            console.error('Failed to retrieve user details:', response.msg);
          }
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { User } from "../user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userProfileIcon: string = "";
  users: User[] = [];
  currentPage: number = 0;
  pageSize: number = 1;
  totalUsers: number = 0;
  totalPages: number = 0;
  p: number = 1;
  searchQuery: string = '';
  selectedSortOrder: string = '';
  originalList: User[] = [];
  filteredUsers: User[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getEmployees().subscribe(
      response => {
        console.log(response);
        console.log("jwt - "+localStorage.getItem("jwtToken"))
        if (response.status === 'OK') {
          this.users = response.data;
          this.originalList = response.data;
          this.filterUsers();
        } else {
          console.error('Failed to retrieve user details:', response.msg);
        }
      },
      error => {
        console.error('An error occurred:', error);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  back() {
    this.router.navigate(['/home']);
  }

  filterUsers() {
    console.log("1")
    let filteredData = this.users;

    if (this.searchQuery === '') {
      if (this.selectedSortOrder === 'nameAsc') {
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.selectedSortOrder === 'nameDesc') {
        filteredData.sort((a, b) => b.name.localeCompare(a.name));
      } else if (this.selectedSortOrder === 'dateAsc') {
        filteredData.sort((a, b) => new Date(a.joiningDate).getTime() - new Date(b.joiningDate).getTime());
      } else if (this.selectedSortOrder === 'dateDesc') {
        filteredData.sort((a, b) => new Date(b.joiningDate).getTime() - new Date(a.joiningDate).getTime());
      } else {
        filteredData = this.originalList;
      }
    } else {
      filteredData = this.users.filter(user =>
        user.name && user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      switch (this.selectedSortOrder) {
        case 'nameAsc':
          filteredData.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'nameDesc':
          filteredData.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'dateAsc':
          filteredData.sort((a, b) => new Date(a.joiningDate).getTime() - new Date(b.joiningDate).getTime());
          break;
        case 'dateDesc':
          filteredData.sort((a, b) => new Date(b.joiningDate).getTime() - new Date(a.joiningDate).getTime());
          break;
      }
    }
    this.users = filteredData;
    this.filteredUsers = filteredData;
  }
}

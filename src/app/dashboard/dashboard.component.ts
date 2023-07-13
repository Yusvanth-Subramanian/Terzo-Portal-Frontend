import { Component } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { User } from "../user.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  users: User[] = [];
  p: number = 1;
  searchQuery: string = '';
  selectedSortOrder: string = '';
  originalList: User[] = [];
  filteredUsers: User[] = [];
  selfDeletionMessage:string="";

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router, private toastr: ToastrService
  ) {
    this.toastr.toastrConfig.positionClass = 'toast-top-right';
    this.toastr.toastrConfig.toastClass = 'custom-toast-class';
  }

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

  canEditOrDelete(user: User) {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'MANAGER' || userRole === 'HR';
  }

  editUser(user: User) {
    this.router.navigate(['/update-user'], { queryParams: { userProfile: JSON.stringify(user) } });

  }

  deleteUser(user: User) {

    this.userService.deleteUser(user).subscribe(
      response => {
        if (response.status === 'OK') {
          this.loadUsers();
        } else {
          console.error('Failed to retrieve user details:', response.msg);
        }
      },
      error => {
        this.toastr.error('You cannot delete yourself while logged in',
          'Error',
          { closeButton: false ,titleClass: "center", messageClass: "center" });
        console.error('Error applying leave:', error);
      }
    );

  }

  view(user: User) {
    console.log(user);
    this.router.navigate(['/show-user-details'], { queryParams: { userProfile: JSON.stringify(user) } });

  }
}

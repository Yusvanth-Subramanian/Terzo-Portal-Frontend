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
  originalList: User[] = [];
  currentPage: number=0;
  totalUserPerPage: number=2;
  totalPages: number = 0;
  sortAttribute: string="";
  sortOption: string="";
  searchText: string=" ";

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
    this.loadTotalUsers()
  }

  loadTotalUsers(){
    this.userService.getTotalUsers().subscribe(
      response => {
        if (response.status === 'OK') {
          this.totalPages=Math.ceil(Number(response.data)/this.totalUserPerPage);
        } else {
          console.error('Failed to retrieve user details:', response.msg);
        }
      },
      error => {
        console.error('An error occurred:', error);
      }
    );
  }

  loadUsers() {
    if(!this.sortOption){
      this.sortOption="null";
    }
    if(!this.sortAttribute){
      this.sortAttribute="null";
    }

    this.userService.getEmployees(this.currentPage,this.totalUserPerPage,this.sortOption,this.sortAttribute,this.searchText).subscribe(
      response => {
        console.log("Load users")
         console.log(response);
        console.log(this.totalPages)
        // console.log("jwt - "+localStorage.getItem("jwtToken"))
        if (response.status === 'OK') {
          this.users = response.data;
          this.originalList = response.data;
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

  previousPage() {
    if(this.currentPage>0){
      this.currentPage--;
      this.loadUsers();
    }
  }

  nextPage() {
    if(this.currentPage<this.totalPages){
      this.currentPage++;
      this.loadUsers();
    }
  }

  applySearchAndSort() {

    if(this.sortOption==="nameAsc"){
      this.sortOption="ASC";
      this.sortAttribute="name";
    }
    if(this.sortOption==="nameDesc"){
      this.sortOption="DESC";
      this.sortAttribute="name";
    }
    if(this.sortOption==="joiningDateAsc"){
      this.sortOption="ASC";
      this.sortAttribute="dateOfJoining";
    }
    if(this.sortOption==="joiningDateDesc"){
      this.sortOption="DESC";
      this.sortAttribute="dateOfJoining";
    }
    this.loadTotalUsers();
    this.loadUsers();
  }
}

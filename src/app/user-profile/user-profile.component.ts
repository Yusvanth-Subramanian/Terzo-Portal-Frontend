import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserDetails } from "../user-details.model";
import { Router } from "@angular/router";
import {UnapprovedLeaves} from "../unapproved-leaves.model";
import {User} from "../user.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: UserDetails = new UserDetails();
  unApprovedLeaves: UnapprovedLeaves[] = [];
  editRowId: number = -1;
  errorMessage:string="";
  errorRowIndex=0;
  noData: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUserProfile();
    this.loadUnApprovedLeaves();
  }


  loadUserProfile() {
    this.userService.getUserProfile().subscribe(
      response => {
        if (response.status === 'OK') {
          this.userProfile = response.data;
        } else {
          console.error('Failed to retrieve user profile:', response.msg);
        }
      },
      error => {
        console.error('An error occurred:', error);
      }
    );
  }
  editUser() {
    // this.userService.check.next(this.userProfile)
    console.log(this.userProfile)
    this.router.navigate(['/update-current-user'], { queryParams: { userProfile: JSON.stringify(this.userProfile) } });

  }
  loadUnApprovedLeaves() {
    this.userService.getUnApprovedLeaves().subscribe(
      response => {
        if (response.status === 'OK') {
          this.unApprovedLeaves = response.data;
          if(this.unApprovedLeaves.length===0){
            this.noData="No pending Unapproved leaves";
          }
        } else {
          console.error('Failed to retrieve unapproved leaves:', response.msg);
        }
      },
      error => {
        console.error('An error occurred:', error);
      }
    );
  }

  editLeave(id: number) {
    this.editRowId = id;
  }

  saveLeave(id: number) {
    const leave = this.unApprovedLeaves.find(l => l.id === id);
    if (!leave) {
      this.errorMessage = "Invalid input";
      return;
    }

    if (
      leave.typeOfLeave.length === 0 ||
      leave.toDate.toString().length === 0 ||
      leave.note.length === 0 ||
      leave.fromDate.toString().length === 0
    ) {
      this.errorMessage = "All the fields are necessary!!!";
      this.errorRowIndex = this.unApprovedLeaves.findIndex(l => l.id === id);
      return;
    }

    if (leave.fromDate > leave.toDate) {
      this.errorMessage = "From date must be before to date!";
      this.errorRowIndex = this.unApprovedLeaves.findIndex(l => l.id === id);
      return;
    }

    if (leave.fromDate < new Date()) {
      this.errorMessage = "From date must be after the specific day!";
      this.errorRowIndex = this.unApprovedLeaves.findIndex(l => l.id === id);
      return;
    }

    if (leave) {
      this.userService.saveLeave(leave).subscribe(
        response => {
          if (response.status === 'OK') {
            console.log('Leave saved successfully');
            this.editRowId = -1;
            this.errorRowIndex = -1;
          } else {
            console.error('Failed to save leave:', response.msg);
          }
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
    }
  }


  deleteLeave(id: number) {
    this.userService.deleteLeave(id).subscribe(
      response => {
        if (response.status === 'OK') {
          console.log('Leave deleted successfully');
          this.loadUnApprovedLeaves();
        } else {
          console.error('Failed to delete leave:', response.msg);
        }
      },
      error => {
        console.error('An error occurred:', error);
      }
    );
  }
  changePassword() {
    this.router.navigate(['/change-password'], { queryParams: { data: JSON.stringify({ email: this.userProfile.email, forForgotPassword: false }) } });
  }

  back() {
    this.router.navigate(['/home'])
  }
}

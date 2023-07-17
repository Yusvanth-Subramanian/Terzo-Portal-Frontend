import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LeavesYetToBeApprovedDTO} from "../leaves-yet-to-be-approved-dto.model";
import {UserService} from "../user.service";

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.css']
})
export class AdminSectionComponent {
  data: LeavesYetToBeApprovedDTO[] = [];
  errorMsg :string="";
  constructor(private router: Router,private userService:UserService) {
    this.loadUnapprovedLeaves();
  }

  canAdd() {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'MANAGER' || userRole === 'HR';
  }

  canApprove() {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'MANAGER' || userRole === 'HR';
  }

  addUser() {
    this.router.navigate(['/add-user']);
  }

  approveItem(item: any) {
    this.userService.approvedLeave(item).subscribe(
      response => {
        if (response.status === 'OK') {
          this.data=response.data;
          this.loadUnapprovedLeaves();
        } else {
          console.error('Failed get unapproved leaves:', response.msg);
        }
      },
      error => {
        console.error('Error in getting unapproved leaves:', error);
      }
    );
  }

  disapproveItem(item: any) {
    this.userService.disApprovedLeave(item).subscribe(
      response => {
        if (response.status === 'OK') {
          this.data=response.data;
          this.loadUnapprovedLeaves();
        } else {
          console.error('Failed get unapproved leaves:', response.msg);
        }
      },
      error => {
        console.error('Error in getting unapproved leaves:', error);
      }
    );
  }

  private loadUnapprovedLeaves() {
    this.userService.loadUnapprovedLeaves().subscribe(
      response => {
        if (response.status === 'OK') {
          this.data=response.data;
          if(this.data.length==0){
            this.errorMsg="Currently there are no unapproved leaves";
          }
        } else {
          console.error('Failed get unapproved leaves:', response.msg);
        }
      },
      error => {
        console.error('Error in getting unapproved leaves:', error);
      }
    );
  }

  back() {
    this.router.navigate(['home'])
  }

  addHolidays() {
    this.router.navigate(['add-holiday'])
  }
}

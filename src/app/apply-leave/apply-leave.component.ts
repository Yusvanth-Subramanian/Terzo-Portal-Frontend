import { Component } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent {
  leaveData = {
    fromDate: Date,
    toDate: Date,
    note: '',
    typeOfLeave: ''
  };
  errorMessage: string = '';
  constructor(private userService:UserService,private router: Router, private toastr: ToastrService) {
    this.toastr.toastrConfig.positionClass = 'toast-top-right';
    this.toastr.toastrConfig.toastClass = 'custom-toast-class';
  }

  submitForm() {
    this.errorMessage="";
    if(this.leaveData.typeOfLeave.length===0||
      this.leaveData.toDate.toString().length===0||
      this.leaveData.note.length===0||
      this.leaveData.fromDate.toString().length===0
    ){
      this.errorMessage = "All the fields are necessary!!!";
      return;
    }
    this.userService.applyLeave(this.leaveData)
      .subscribe(
        response => {
          this.toastr.success('Leave applied successfully',
            'Success',
            { closeButton: false ,titleClass: "center", messageClass: "center" });
          this.router.navigate(['/home']);
        },
        error => {
          this.toastr.error('Enter valid data (Check the To and From dates)',
            'Error',
            { closeButton: false ,titleClass: "center", messageClass: "center" });
          console.error('Error applying leave:', error);
        }
      );
  }

  back() {
    this.router.navigate(['/home']);
  }
}

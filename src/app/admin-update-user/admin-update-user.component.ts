import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../user.model";
import {UserService} from "../user.service";
import {AdminUpdateUserDTO} from "../admin-update-user-dto.model";
import {ToastrService} from "ngx-toastr";
import {GetManagersDTO} from "../get-managers-dto.model";

@Component({
  selector: 'app-admin-update-user',
  templateUrl: './admin-update-user.component.html',
  styleUrls: ['./admin-update-user.component.css']
})
export class AdminUpdateUserComponent {

  managers:GetManagersDTO[]=[];

  constructor(private router:Router,private route:ActivatedRoute,private userService:UserService, private toastr: ToastrService) {
    this.toastr.toastrConfig.positionClass = 'toast-top-right';
    this.toastr.toastrConfig.toastClass = 'custom-toast-class';
  }

  adminUpdateUserDTO:AdminUpdateUserDTO = new AdminUpdateUserDTO();
  user:User = new User();

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const userProfileString = params['userProfile'];
      this.adminUpdateUserDTO = JSON.parse(userProfileString);
      console.log(this.adminUpdateUserDTO)
    });
    this.loadManagers();
  }


  saveUser() {
    this.userService.saveUserChanges(this.adminUpdateUserDTO).subscribe(

      response => {
        if (response.status === 'OK') {
          console.log('User saved successfully');
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Failed to save user:', response.msg);
        }
      },
      error => {
        this.toastr.error('All the fields are required',
          'Error',
          { closeButton: false ,titleClass: "center", messageClass: "center" });
        console.error('Error applying leave:', error);
      }
    );
  }

  loadManagers(){
    this.userService.loadManagers().subscribe(
      response => {
        if (response.status === 'OK') {
          console.log("here");
          this.managers=response.data;
          console.log(this.managers[0].name+" "+this.managers[0].id);
        } else {
          console.error('Failed to save user:', response.msg);
        }
      },
      error => {
        console.error('Error applying leave:', error);
      }
    );
  }

  back() {
    this.router.navigate(['/dashboard']);
  }
}

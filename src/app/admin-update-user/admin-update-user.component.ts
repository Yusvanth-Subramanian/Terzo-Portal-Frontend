import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../user.model";
import {UserService} from "../user.service";
import {AdminUpdateUserDTO} from "../admin-update-user-dto.model";

@Component({
  selector: 'app-admin-update-user',
  templateUrl: './admin-update-user.component.html',
  styleUrls: ['./admin-update-user.component.css']
})
export class AdminUpdateUserComponent {

  constructor(private router:Router,private route:ActivatedRoute,private userService:UserService) { }

  adminUpdateUserDTO:AdminUpdateUserDTO = new AdminUpdateUserDTO();
  user:User = new User();

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const userProfileString = params['userProfile'];
      this.adminUpdateUserDTO = JSON.parse(userProfileString);
      console.log(this.adminUpdateUserDTO)
    });
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
        console.error('An error occurred:', error);
      }
    );
  }

  back() {
    this.router.navigate(['/dashboard']);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UpdateCurrentUserDetails} from "../update-current-user-details.model";
import {Subscription} from "rxjs";
import {UserDetails} from "../user-details.model";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-current-user.component.html',
  styleUrls: ['./update-current-user.component.css']
})
export class UpdateCurrentUserComponent implements OnInit {
  userProfile: UserDetails = new UserDetails();
  updateUser:UpdateCurrentUserDetails=new UpdateCurrentUserDetails();
  email:string="";
  id:number=0;
  constructor(private route: ActivatedRoute,private userService:UserService,private router:Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const userProfileString = params['userProfile'];
      this.userProfile = JSON.parse(userProfileString);
      // console.log(userProfileString);
      // console.log(this.userProfile);
    });
    this.id =this.userProfile.id;
    this.email = this.userProfile.email;
    this.updateUser.name=this.userProfile.name;
    this.updateUser.address=this.userProfile.address;
    this.updateUser.designation=this.userProfile.designation;
    this.updateUser.dateOfBirth=this.userProfile.dateOfBirth;
    this.updateUser.mobileNumber = this.userProfile.mobileNumber;
    this.userProfile.profilePicUrl = this.userProfile.profilePicUrl;
  }

  submit(email: any, id: any) {
    // this.updateUser.id=id;
    // this.updateUser.email = email;
     console.log(this.userProfile);
     console.log(id);
     console.log(email);
    this.userService.updateUser(this.updateUser,id,email)
      .subscribe(
        response => {
          if (response.status === 'OK') {
            console.log('User details updated successfully');
            this.router.navigate(['/user-profile']);
          } else {
            console.error('Failed to update user details:', response.msg);
          }
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
  }

  back() {
    this.router.navigate(['/user-profile'])
  }
}

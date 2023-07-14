import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  forForgotPassword = false;
  data:any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router:Router,
    private route: ActivatedRoute
  )
  { this.changePasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    oldPassword: [''],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });
    this.route.queryParams.subscribe(params => {
      const userProfileString = params['data'];
      this.data = JSON.parse(userProfileString);
    });
    this.forForgotPassword=this.data.forForgotPassword;
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      email:this.data.email,
      oldPassword: [''],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  errorMsg:string="";

  onSubmit() {
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    const email = this.changePasswordForm.get('email')?.value;
    const oldPassword = this.changePasswordForm.get('oldPassword')?.value;
    const confirmPassword = this.changePasswordForm.get('confirmPassword')?.value;
    if (this.forForgotPassword) {
      delete this.changePasswordForm.value.oldPassword;
    }

    if(newPassword!=confirmPassword){
      this.errorMsg="Password and Confirm Password dont match";
    }
    else {

      if (this.changePasswordForm.valid) {
        const changePasswordRequest = {
          newPassword,
          forForgotPassword: this.forForgotPassword,
          email,
          oldPassword
        };

        this.userService.changePassword(changePasswordRequest)
          .subscribe(response => {
            if (response.status === "OK") {
              this.router.navigate(['login'])
            }
            console.log('Password change response:', response);
          }, error => {
            this.errorMsg="Incorrect old password"
            console.log("Error");
          });
      }
    }
  }
}

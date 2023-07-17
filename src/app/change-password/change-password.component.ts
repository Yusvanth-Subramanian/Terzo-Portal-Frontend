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
  email:string="";
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
      if(userProfileString) {
        this.data = JSON.parse(userProfileString);
      }
    });
    this.route.queryParams.subscribe(params =>
    {
      const email = params['email'];
      this.email=email;
    })
    console.log("email");
    console.log(this.email);
    if(this.data) {
      this.forForgotPassword = this.data.forForgotPassword;
    }
    if(!this.forForgotPassword && this.email){
      this.forForgotPassword = true;
    }
  }

  ngOnInit() {
    let formEmail :string="";
    if(this.email){
      formEmail=this.email;
    }
    else{
      formEmail=this.data.email;
    }
    this.changePasswordForm = this.formBuilder.group({
      email:formEmail,
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
    if (this.forForgotPassword || this.email) {
      delete this.changePasswordForm.value.oldPassword;
    }
    console.log(this.forForgotPassword);
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

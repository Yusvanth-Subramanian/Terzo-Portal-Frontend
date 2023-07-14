import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  otpSent = false;
  errorMessage: string="";
  email:string=""

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router:Router
  ) { this.forgotPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    otp: ['', Validators.required]
  });}

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.otpSent) {
      const email = this.forgotPasswordForm.get('email')?.value;
      this.email=email;
      this.userService.generateOTP(email).subscribe(response => {
        if (response.status === 'OK') {
          this.otpSent = true;
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Invalid email. Please try again.';
        }
      });
    } else {
      const otp = this.forgotPasswordForm.get('otp')?.value;
      console.log(otp)
      this.userService.verifyOTP(otp,this.email).subscribe(response => {
        console.log(response)
        if (response.status === 'OK'|| response.msg === "Password changed successfully") {
          const changePasswordDTO = {
            email:this.email,forForgotPassword: true
          }
          this.router.navigate(['change-password'], { queryParams: { data: JSON.stringify(changePasswordDTO) } });

        } else {
          this.errorMessage = 'Invalid OTP. Please try again.';
        }
      });
    }
  }
}

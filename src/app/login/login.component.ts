import { Component } from '@angular/core';
import {UserService} from "../user.service";
import { Router } from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string="";
  password: string="";
  errorMessage: string = '';


constructor(private userService: UserService, private router: Router) { }


  onSubmit() {
    this.errorMessage = '';
    this.userService.login(this.email, this.password)
      .subscribe(response => {
        if (response.status === 'OK') {
          const jwtToken = response.data.jwt;
          const refreshToken = response.data.refreshToken;
          const userRole = response.data.userRoles;
          localStorage.setItem('jwtToken', "Bearer "+jwtToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('userRole',userRole);;

          this.router.navigate(['/home']);
        } else {
          this.errorMessage = response.msg;
        }
      }, error => {
        if (error instanceof HttpErrorResponse && error.status === 417 || error.status ===400) {
          this.errorMessage = "Invalid Credentials!";
          console.error('Expectation Failed:', error.message);
        }
        else if(error.status === 403){
          this.errorMessage = "Activate your account to login";
        }
        else {
          console.error('An error occurred:', error);
        }
      });
  }
}

import { Component } from '@angular/core';
import {AddUserDTO} from "../add-user-dto.model";
import {Router} from "@angular/router";
import {GetManagersDTO} from "../get-managers-dto.model";
import {UserService} from "../user.service";
import {ToastrService} from "ngx-toastr";
import {GetDepartmentsDTO} from "../get-departments-dto.model";
import {GetRolesDTO} from "../get-roles-dto.model";
import {GetTeamsDTO} from "../get-teams-dto.model";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  user:AddUserDTO=new AddUserDTO();

  managers:GetManagersDTO[]=[];
  departments: GetDepartmentsDTO[]=[];
  roles: GetRolesDTO[]=[];
  teams: GetTeamsDTO[]=[];

  constructor(private router:Router,private userService:UserService, private toastr: ToastrService) {
    this.toastr.toastrConfig.positionClass = 'toast-top-right';
    this.toastr.toastrConfig.toastClass = 'custom-toast-class';
    this.loadManagers();
    this.loadTeams();
    this.loadDepartments();
    this.loadRoles();
  }


  saveUser() {

    this.user.passwordForUser= Math.floor(Math.random() * 900000) + 100000+"";

    this.userService.saveUser(this.user).subscribe(
      response => {
        if (response.status === 'OK') {
          this.toastr.success('User added successfully',
            'Done',
            { closeButton: false ,titleClass: "center", messageClass: "center" });
          this.router.navigate(['/admin-section'])
        } else {
          console.error('Failed to save user:', response.msg);
        }
      },
      error => {
        if(error.status === 409){
          this.toastr.error('User with this email already exists!!!',
            'Error',
            { closeButton: false ,titleClass: "center", messageClass: "center" });
          console.error('Error applying leave due to email:', error);
        }
        else {
          this.toastr.error('All the fields are required',
            'Error',
            {closeButton: false, titleClass: "center", messageClass: "center"});
          console.error('Error applying leave:', error);
        }
      }
    );
  }

  private loadManagers() {
    this.userService.loadManagers().subscribe(
      response => {
        if (response.status === 'OK') {
          console.log("managers")
          console.log(response)
          this.managers=response.data;
        } else {
          console.error('Failed to load manager:', response.msg);
        }
      },
      error => {
        console.error('Error', error);
      }
    );
  }

  back() {
    this.router.navigate(['/admin-section']);
  }

  private loadTeams() {
    this.userService.loadTeams().subscribe(
      response => {
        if (response.status === 'OK') {
          this.teams=response.data;
        } else {
          console.error('Failed to load manager:', response.msg);
        }
      },
      error => {
        console.error('Error', error);
      }
    );
  }

  private loadDepartments() {
    this.userService.loadDepartments().subscribe(
      response => {
        if (response.status === 'OK') {
          this.departments=response.data;
        } else {
          console.error('Failed to load manager:', response.msg);
        }
      },
      error => {
        console.error('Error', error);
      }
    );
  }

  private loadRoles() {
    this.userService.loadRoles().subscribe(
      response => {
        if (response.status === 'OK') {
          this.roles=response.data;
        } else {
          console.error('Failed to load manager:', response.msg);
        }
      },
      error => {
        console.error('Error', error);
      }
    );
  }
}

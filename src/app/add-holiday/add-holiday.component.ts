import { Component } from '@angular/core';
import {AddHolidayDTO} from "../add-holiday-dto.model";
import {User} from "../user.model";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.css']
})
export class AddHolidayComponent {
  holiday: AddHolidayDTO = new AddHolidayDTO();

  constructor(private userService:UserService,private router:Router) {
  }

  saveHoliday() {
    this.userService.addHoliday(this.holiday).subscribe(
      response=>{
        if(response.msg==="Holiday saved"){
          this.router.navigate(['admin-section'])
        }
      }
    )
  }
}

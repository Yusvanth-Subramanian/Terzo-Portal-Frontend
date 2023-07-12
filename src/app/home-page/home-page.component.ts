import { Component } from '@angular/core';
import {Leave} from "../leave.model";
import {UserService} from "../user.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  upcomingHolidays: any;
  upcomingTimeOff: any;
  birthdayBuddies: any;
  workAnniversaries: any;
  newHires: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadUpcomingHolidays();
    this.loadUpcomingTimeOff();
    this.loadBirthDayBuddies();
    this.loadWorkAnniversaries();
    this.loadNewHires();
  }

  private loadUpcomingHolidays() {
    this.userService.loadUpcomingHolidays()
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 'OK') {
            this.upcomingHolidays = response.data;

          } else {
            console.error('Failed to retrieve holidays:', response.msg);
          }
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
  }

  private loadUpcomingTimeOff() {
    this.userService.loadUpcomingTimeOffs()
      .subscribe(
        response => {
          console.log("time-off"+response)
          if (response.status === 'OK') {
            this.upcomingTimeOff = response.data;

          } else {
            console.error('Failed to retrieve holidays:', response.msg);
          }
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
  }

  private loadBirthDayBuddies() {
    this.userService.loadBirthdayBuddies()
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 'OK') {
            this.birthdayBuddies = response.data;

          } else {
            console.error('Failed to retrieve birthday buddies:', response.msg);
          }
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
  }

  private loadWorkAnniversaries() {
    this.userService.loadWorkAnniversaries()
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 'OK') {
            this.workAnniversaries = response.data;

          } else {
            console.error('Failed to retrieve work anniversary list:', response.msg);
          }
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
  }

  private loadNewHires() {
    this.userService.loadNewHires()
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 'OK') {
            this.newHires = response.data;

          } else {
            console.error('Failed to retrieve birthday buddies:', response.msg);
          }
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
  }
}

import { Component } from '@angular/core';
import {UserDataInCalendarDTO} from "../user-data-in-calendar-dto.model";
import {UserService} from "../user.service";

@Component({
  selector: 'app-leave-calender',
  templateUrl: './leave-calender.component.html',
  styleUrls: ['./leave-calender.component.css']
})
export class LeaveCalenderComponent {
  usersData: UserDataInCalendarDTO[] = [];
  months: string[] = [];

  ngOnInit() {
    const monthsInYear: string[] = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    this.months = monthsInYear.slice(currentMonth).concat(monthsInYear.slice(0, currentMonth));
    this.fetchUserData();
  }

  constructor(private userService: UserService) {}


  getDaysInMonth(month: string): number[] {
    const year = new Date().getFullYear();
    const monthIndex = this.months.indexOf(month);
    const daysCount = new Date(year, monthIndex + 1, 0).getDate();
    return Array.from({ length: daysCount }, (_, i) => i + 1);
  }

  isLeaveDay(user: UserDataInCalendarDTO, day: number, month: string): boolean {
    if (user.usersLeaves) {
      return user.usersLeaves.some(leave => {
        const startDate = new Date(leave.startDate);
        const endDate = new Date(leave.endDate);
        const leaveMonth = startDate.toLocaleString('default', { month: 'long' });
        return day >= startDate.getDate() && day <= endDate.getDate() && leaveMonth === month;
      });
    }
    return false;
  }

  private fetchUserData() {
    this.userService.getCalenderData().subscribe(
      (userData) => {
        this.usersData=userData.data;
        console.log('User data:', this.usersData);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

}

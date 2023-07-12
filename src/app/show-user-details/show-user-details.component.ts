import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../user.model";

@Component({
  selector: 'app-show-user-details',
  templateUrl: './show-user-details.component.html',
  styleUrls: ['./show-user-details.component.css']
})
export class ShowUserDetailsComponent implements OnInit{

  constructor(private router:Router,private route:ActivatedRoute) { }

  user:User = new User();

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const userProfileString = params['userProfile'];
      this.user = JSON.parse(userProfileString);
    });
  }

  back() {
    this.router.navigate(['/dashboard']);
  }
}

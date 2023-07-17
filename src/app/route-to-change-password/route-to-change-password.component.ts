import { Component } from '@angular/core';
import {ActivatedRoute, Router, Routes} from "@angular/router";

@Component({
  selector: 'app-route-to-change-password',
  templateUrl: './route-to-change-password.component.html',
  styleUrls: ['./route-to-change-password.component.css']
})
export class RouteToChangePasswordComponent {
  email: string="";

  constructor(private route: ActivatedRoute,private router:Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.email = params['email'];
    });
    this.router.navigate(['change-password'],{queryParams:{email:JSON.stringify(this.email)}});
  }

}

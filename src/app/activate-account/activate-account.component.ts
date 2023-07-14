import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent {

  constructor(
    private router:Router
  ) {
    router.navigate(['forgot-password'])
  }
}

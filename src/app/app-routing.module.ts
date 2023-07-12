import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from "./auth-guard.service";
import {HomePageComponent} from "./home-page/home-page.component";
import {ApplyLeaveComponent} from "./apply-leave/apply-leave.component";
import {AdminSectionComponent} from "./admin-section/admin-section.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {UpdateCurrentUserComponent} from "./update-current-user/update-current-user.component";


let routes: Routes;
routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'apply-leave', component: ApplyLeaveComponent, canActivate: [AuthGuard]},
  {path:'admin-section',component:AdminSectionComponent,canActivate:[AuthGuard]},
  {path:'user-profile',component:UserProfileComponent,canActivate:[AuthGuard]},
  {path:'update-current-user',component:UpdateCurrentUserComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

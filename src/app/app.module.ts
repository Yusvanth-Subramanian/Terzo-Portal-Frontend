import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { HomePageComponent } from './home-page/home-page.component';
import {NgxPaginationModule} from "ngx-pagination";
import {NgOptimizedImage} from "@angular/common";
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {ExpiredJwtHandler} from "./expired-jwt-handler.model";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { UpdateCurrentUserComponent } from './update-current-user/update-current-user.component';
import { ShowUserDetailsComponent } from './show-user-details/show-user-details.component';
import { AdminUpdateUserComponent } from './admin-update-user/admin-update-user.component';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ApplyLeaveComponent,
    HomePageComponent,
    AdminSectionComponent,
    UserProfileComponent,
    UpdateCurrentUserComponent,
    ShowUserDetailsComponent,
    AdminUpdateUserComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: ExpiredJwtHandler,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

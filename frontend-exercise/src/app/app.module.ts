import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ManagementDashboardComponent } from './management-dashboard/management-dashboard.component';
import { UserDetailsDashboardComponent } from './user-details-dashboard/user-details-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthCanActivateGuard } from './guard/auth-can-activate.guard';
import { RouterService } from './services/router.service';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = 
[
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "", redirectTo:"register", pathMatch:"full"},
  {path: "manage", component: ManagementDashboardComponent, canActivate: [AuthCanActivateGuard]},
  {path: "users", component: UserDetailsDashboardComponent, canActivate: [AuthCanActivateGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ManagementDashboardComponent,
    UserDetailsDashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }

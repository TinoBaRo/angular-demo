import { Component, OnInit } from '@angular/core';
import { UserData } from '../models/UserData';
import { UserdataService } from '../services/userdata.service';
import { GlobalDataService } from '../services/global-data.service';
import { RouterService } from '../services/router.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-management-dashboard',
  templateUrl: './management-dashboard.component.html',
  styleUrls: ['./management-dashboard.component.css']
})
export class ManagementDashboardComponent implements OnInit 
{
  submitMessage: string = "";
  errorMessage : string ="";
  registerForm:any = FormGroup;
  users : UserData[] = [];
  

  userlist: UserData[] = [];

  constructor(private userDataService: UserdataService, private globalService: GlobalDataService, private routeService: RouterService,
    private authService: AuthenticationService, private formbuilder: FormBuilder ) 
  {}

  ngOnInit(): void 
  {
    // API call
    this.userDataService.getAllUserData().subscribe(
      (result: any)=>
      {
        this.userlist = result.data
      },
      (err:any)=>
      {
        alert(err.error)
      }
    );

    this.initializeFormBuilder()
  }


  loadUserDetails(userdata:any)
  {
    this.globalService.setUser(userdata);

    this.routeService.openUsers();
  }


  loadRegisterPage()
  {
    this.routeService.openRegister();
  }


  initializeFormBuilder() 
  {
    this.registerForm = this.formbuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]+$")] ],
        password:['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")] ]
      }
    )
  }

  register(user: any)
  {
    // alert(user.email + user.password);
    this.authService.addUser(user).subscribe(
      (result: any)=>
      {
        this.registerForm.reset();

        this.globalService.setMyToken(result.token);
        
        this.routeService.openManage();

        alert("Successfully added user");
      },
      (err:any)=>
      {
        alert(err.error)
      }
    );
  }
}

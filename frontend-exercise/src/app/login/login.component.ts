import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../models/UserData';
import { AuthenticationService } from '../services/authentication.service';
import { GlobalDataService } from '../services/global-data.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{
  submitMessage: string = "";
  errorMessage : string ="";
  loginForm:any = FormGroup;
  users : UserData[] = [];
  submitted: boolean = false;

  errorMessageFileds = ""; 
  isValid = false;

  constructor(private formbuilder: FormBuilder , private authService : AuthenticationService, private routeService: RouterService,
    private globalService: GlobalDataService) 
  {
  }

  ngOnInit() 
  {
    this.loginForm = this.formbuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]+$")] ],
        password:['', Validators.required ],
        confirmpassword: ['', Validators.required]
      },
      {
        validators: this.MustMatch('password', 'confirmpassword')
      }
    )
  }

  MustMatch(controlName: string, matchingControlName: string)
  {
    return(formGroup: FormGroup)=>
    {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      
      if(matchingControl.errors && !matchingControl.errors['MustMatch'])
      {
        // not submit form
        return;
      }
      if(control.value !== matchingControl.value)
      {
        matchingControl.setErrors({MustMatch:true}) 
      }
      else
      {
        matchingControl.setErrors(null);
      }
    }
  }

  login(user: any)
  {
    this.authService.loginUser(user).subscribe(
      (result: any)=>
      {
        this.globalService.setMyToken(result.token);

        this.routeService.openManage();
      },
      (err:any)=>
      {
        alert("Error: Unsuccesful login of user")
        this.loginForm.reset();
      }
    );
  }
  
}

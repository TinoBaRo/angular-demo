import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, SelectMultipleControlValueAccessor, Validators } from '@angular/forms';
import { UserData } from '../models/UserData';
import { AuthenticationService } from '../services/authentication.service';
import { GlobalDataService } from '../services/global-data.service';
import { RouterService } from '../services/router.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit 
{
  submitMessage: string = "";
  errorMessage : string ="";
  registerForm:any = FormGroup;
  users : UserData[] = [];
  

  constructor(private formbuilder: FormBuilder , private authService : AuthenticationService, private routeService: RouterService, 
    private globalService: GlobalDataService) 
  {
  }

  ngOnInit() 
  {
    this.registerForm = this.formbuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]+$")] ],
        password:['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")] ],
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

  register(user: any)
  {
    // alert(user.email + user.password);
    this.authService.addUser(user).subscribe(
      (result: any)=>
      {
        this.globalService.setMyToken(result.token);
        
        this.routeService.openManage();
      },
      (err:any)=>
      {
        alert("Error: Unsuccesful registration of user")
        this.registerForm.reset();
      }
    );
  }


}

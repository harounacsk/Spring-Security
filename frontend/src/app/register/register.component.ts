import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerFormGroup : FormGroup;
  errorMessage:string | undefined;

  constructor(private route: Router, private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService, private router: Router) {
    this.registerFormGroup = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
   }

  ngOnInit(): void {
    /**
     * if User connected, navigate to home component
     */
    if (this.tokenService.isTokenValid()) {
      this.route.navigateByUrl('home');
    }
  }

  
  public handleSignUp():void{
    const user={
      username:this.registerFormGroup.value.username,
      email:this.registerFormGroup.value.email,
      password:this.registerFormGroup.value.password
    };
    this.authService.signUp(user).subscribe({
      next:()=>{
        alert("Success");
      },
      error:()=>{
        alert("Error");
      }
    })
  }

}

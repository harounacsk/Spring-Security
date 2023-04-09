import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup : FormGroup;
  errorMessage:string | undefined;

  constructor(private route: Router, private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService, private router: Router) {
    this.loginFormGroup = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
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


  public handleSignIn():void {
    const login = { username: this.loginFormGroup.value.username, password: this.loginFormGroup.value.password };
    this.authService.signIn(login).subscribe({
      next: (data) => {
          this.tokenService.saveToken(data.token);
          this.router.navigateByUrl("home");
      },
      error:()=>{
        this.errorMessage="Votre nom d'utilisateur ou mot de passe est incorrect";
      }
    });

  }

}

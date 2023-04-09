import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  jwtHelper = new JwtHelperService();

  constructor() { }

  public saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }
  

  public clearToken(): void {
    localStorage.removeItem('token');
  }

  public isTokenValid(): boolean {
    return  (this.isTokenNotNull() && !this.jwtHelper.isTokenExpired(this.getToken()))
  }

  public isTokenExpired(): boolean {
    return (this.isTokenNotNull() && this.jwtHelper.isTokenExpired(this.getToken()));
  }

  public isTokenNotNull(){
    return !!this.getToken();
  }
}

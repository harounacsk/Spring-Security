import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwToken } from '../model/jw-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:9898/auth/';

  constructor(private http: HttpClient) { }

  public signIn(user: User): Observable<JwToken> {
    let headers = new HttpHeaders()
      .set('Authorization', 'No-Auth');
    return this.http.post<JwToken>(`${this.url}login`, user, { headers: headers });
  }

  public signUp(user: User) {
    return this.http.post(`${this.url}signup`, user);
  }

}

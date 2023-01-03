import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginData: any = {
    user: undefined,
    accessToken: undefined,
  };
  singupMessage: any = {
    message: undefined,
    error: undefined,
  }

  constructor(private http: HttpClient) { }

  signup(user: any) {
    return this.http.post('/api/user/signup', user).pipe(
      map(result => {
        this.singupMessage = result;
        return this.singupMessage.message;
      })
    )
  }
  login(user: any) {
    return this.http.post('/api/user/login', user).pipe(
      map(result => {
        return result;
      })
    )
  }

  verify(): any {
    const accessToken = localStorage.getItem('accessToken');
    const body = {
      accessToken: accessToken
    }
    return this.http.post('/api/user/verify', body).pipe(res => { return res });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Generic } from '../models/generic';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = environment.url + 'login'
  registerUrl = environment.url + 'register'

  constructor(
    private http: HttpClient
  ) { }

  // Create User
  register = (data: User): Observable<Generic<User>> => {
    return this.http.post<Generic<User>>(`${this.registerUrl}`, data)
  }

  //Login
  login = (data: any) => {
    return this.http.post(`${this.loginUrl}`, data)
      .pipe(
        map((data: any) => {
          return data;
        })
      )
  }

}

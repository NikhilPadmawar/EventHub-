import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";

  constructor(private httpClient: HttpClient,private router:Router) { }

  registerUser(user) {
    return this.httpClient.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.httpClient.post<any>(this._loginUrl, user)
  }

  loggedIn() {
    // !! this will always return boolean value instead of whole token
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}

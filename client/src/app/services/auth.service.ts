import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { User, UserRegister } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7067/api/Users/"
  constructor(private http : HttpClient, private router:Router) { }

  signup(user: UserRegister){
    return this.http.post<any>(`${this.baseUrl}register`,user)
  }

  login(user: User){
    return this.http.post<any>(`${this.baseUrl}login`,user)
  }

  signOut(){
    localStorage.clear()
    this.router.navigate(['login'])
  }

  storeToken(token: string){
    localStorage.setItem('token',token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }
  
} 

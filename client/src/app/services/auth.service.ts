import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { User, UserRegister } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7067/api/Users/"
  constructor(private http: HttpClient, private router: Router) { }

  signup(user: UserRegister) {
    return this.http.post<any>(`${this.baseUrl}register`, user)
  }

  login(user: User) {
    return this.http.post<any>(`${this.baseUrl}login`, user,
      {
        withCredentials: true
      })
  }

  signOut() {
    localStorage.clear()
    this.router.navigate(['login'])
  }

  storeToken(token: any) {
    localStorage.setItem('token', token)
  }

  storeId(id: any) {
    localStorage.setItem('id', id)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getId() {
    return localStorage.getItem('id')
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  generateRefreshToken(id: Number) {
    return this.http.get(`${this.baseUrl}refresh?id=` + id,
      {
        withCredentials: true,
        responseType: 'text'
      })
  }

} 

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(private http:HttpClient) { }

//   signup(user:any){
//     return this.http.post<any>(`http://localhost:5228/api/User/Register`,user);
//   }

//   login(data:any){
//     return this.http.post<any>(`http://localhost:5228/api/User/AuthenticateUser`,data);
//   }

//   storeToken(tokenValue: string){
//     localStorage.setItem('token',tokenValue)
//   }

//   getToken(){
//     return localStorage.getItem('token')
//   }

//   isLogedIn():boolean{
//     return !!localStorage.getItem('token')
//   }
// }




import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  signup(user:any){
    return this.http.post<any>(`http://localhost:5228/api/User/Register`,user);
  }

  login(data:any){
    return this.http.post<any>(`http://localhost:5228/api/User/AuthenticateUser`,data);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token',tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLogedIn():boolean{
    return !!localStorage.getItem('token')
  }

  getCurrentUser(){
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }
}

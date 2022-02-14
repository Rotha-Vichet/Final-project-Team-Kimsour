import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  register(body:any){
    return this._http.post('http://localhost:3000/users/register',body,{
      headers : new HttpHeaders().append('Content-Type','application/json')
    }) // return as observable type 
  }
  
  login(body:any){
    return this._http.post('http://127.0.0.1:3000/users/login',body,{
      observe:'body',
      withCredentials:true, //enable cookies

      headers : new HttpHeaders().append('Content-Type','application/json')
    }) // return as obserable type
  }
}

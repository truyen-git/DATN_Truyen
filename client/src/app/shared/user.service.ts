import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from './user.model';


 /*const BASEURL = 'http://localhost:3000/api/resetpassword';*/

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${environment.apiBaseUrl}/admin/users`);
  }
  deleteUsers(userId){
    return this.http.delete(`${environment.apiBaseUrl}/admin/users/${userId}`);
  }

  //HttpMethods

  postUser(user: User){
    return this.http.post(environment.apiUrl+'/register',user,this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  loginGG(tokenId) {
    return this.http.post(environment.apiUrl + '/google', tokenId,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiUrl + '/userProfile');
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.setItem('token', '');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}


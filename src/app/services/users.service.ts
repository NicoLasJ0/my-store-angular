import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, CreateUserDTO } from '../models/users.models';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://damp-spire-59848.herokuapp.com/api/users/';

  getUsers(){
    return this.http.get<User[]>(this.apiUrl);
  }
  createUsers(user: CreateUserDTO){
    return this.http.post<User>(this.apiUrl, user);
  }
}

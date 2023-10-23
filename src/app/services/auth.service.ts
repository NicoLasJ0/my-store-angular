import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { User } from '../models/users.models';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) { }
  private apiUrl = 'https://damp-spire-59848.herokuapp.com/api/auth';
  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.access_token)
        })
      );
  }
  profile() {
    return this.http.get<User>(`${this.apiUrl}/profile`).
      pipe(
        tap(user => {
          this.user.next(user);
          console.log(user);
        })
      );
  }
  loginAndGet(email: string, password: string) {
    return this.login(email, password).pipe(
      switchMap(() => this.profile())
    )
  }
  logout() {
    this.tokenService.removeToken();
  }

}

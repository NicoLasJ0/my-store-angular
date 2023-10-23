import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/users.models';
@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user$.
      pipe(
        map(user => {
          if(!user){
            alert('esta vaina no existe');
          }
          if (user?.role === 'admin') {
            return true
          }
          this.router.navigate(['/home']);
          return false
        })
      )
  }

}

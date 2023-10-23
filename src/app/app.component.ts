import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { Auth } from './models/auth.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private tokenService: TokenService,private userService: UsersService, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    const token= this.tokenService.getToken();
    if(token){
      this.authService.profile().
        subscribe();
    }
  }
  createUser() {
    this.userService.createUsers({ name: 'Nicolas', email: 'nicoadmin@gmail.com', password: 'door123', role: 'admin' }).subscribe(data=> console.log(data));
  }
  login(){
    this.authService.login('nicoadmin@gmail.com', 'door123').subscribe(data=> {
      console.log(data);
    });
  }


}

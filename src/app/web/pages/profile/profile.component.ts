import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/users.models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService){

  }
  user: User | null= null;   
  ngOnInit(): void {
    this.authService.user$.
      subscribe(data=> {
        this.user= data;
      });
  }
  
}

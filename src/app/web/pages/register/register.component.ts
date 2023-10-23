import { Component } from '@angular/core';
import { Observable } from 'rxjs';

export interface OnExit {
  onExit: ()=> boolean | Observable<boolean> | Promise<boolean>
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnExit {
  onExit(){
    const rta= confirm('Estas seguro que quieres salir?');
    return true;
  }
}

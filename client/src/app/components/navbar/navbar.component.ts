import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private auth: AuthService) {
  }


  logOut() {
    this.auth.signOut()
  }

  isLoggedIn(){
    return this.auth.isLoggedIn()
  }

}

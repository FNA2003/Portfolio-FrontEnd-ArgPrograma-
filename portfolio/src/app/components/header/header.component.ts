import { Component } from '@angular/core';

import { faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { CallDBService } from 'src/app/services/call-db.service';

import { SocialMedia } from 'src/app/interfaces/SocialInterface';

import { LoggInService } from 'src/app/services/logg-in.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  socialArray:Array<SocialMedia> = [];

  loggedIn:boolean = false;
  
  logOutIcon = faSignOut;
  logInIcon = faSignIn;


  constructor(
    private service:CallDBService, 
    private logIn:LoggInService
  ) {  }

  ngOnInit() {
    this.service.getDataBase().subscribe(values => {
      this.socialArray = values["social_media"];
    });
  }

  signInUser() {
    this.logIn.toggleSesion();
    this.loggedIn = !this.loggedIn;
  }
}

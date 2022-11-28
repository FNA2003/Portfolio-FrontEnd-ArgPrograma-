import { Component } from '@angular/core';

import { faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { CallDBService } from 'src/app/services/call-db.service';

import { SocialMedia } from './Interface/SocialInterface';

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


  constructor(private service:CallDBService) {  }

  ngOnInit() {
    this.service.getDataBase().subscribe(values => {
      this.socialArray = values["social_media"];
    });
  }

  toggleLogIn() {
    this.loggedIn = !this.loggedIn;
  }
}

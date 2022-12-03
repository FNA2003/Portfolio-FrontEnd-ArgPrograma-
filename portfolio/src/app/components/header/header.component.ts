import { Component } from '@angular/core';

import { CallDBService } from 'src/app/services/call-db.service';
import { LoggInService } from 'src/app/services/logg-in.service';

import { SocialMedia } from 'src/app/interfaces/SocialInterface';

import { faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  socialArray:Array<SocialMedia> = []; // La lista de todas las redes sociales

  loggedIn:boolean = false; // Estado de conexión al servidor
  
  /* Iconos */
  logOutIcon = faSignOut;
  logInIcon = faSignIn;


  /* Servicios para leer (y escribir) cierta información */
  constructor( private db:CallDBService, private logIn:LoggInService ) {  }

  /* Le damos los valores a la lista */
  ngOnInit() {
    this.db.getDataBase("social_media")
      .subscribe(values => {
        this.socialArray = values;
      });
  }

  /* Botón de inicio de sesion (este muestra el formulario, pero como no existe un back-end, se acepta a todos) */
  signInUser() {
    this.logIn.toggleSesion();
    this.loggedIn = !this.loggedIn;
  }
}

import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggInService {
  loggedIn:boolean = false; // Estado interno del servicio que nos permite leer el estado de este usuario
  subject:Subject<any> = new Subject();// Subject es como un Observable de doble linea

  
  /* Cambiamos el estado de la sesión internamente y, avisamos a los suscriptos de este cambio */
  toggleSesion():void {
    this.loggedIn = !this.loggedIn;
    this.subject.next(this.loggedIn);
  }
  /* Función para que cada subscriptor se vincule a el servicio y se notifique de un cambio */
  getSesionState():Observable<any> {
    return this.subject.asObservable();
  }
}

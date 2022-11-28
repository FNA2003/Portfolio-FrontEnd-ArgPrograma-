import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggInService {
  loggedIn:boolean = false;
  subject:Subject<any> = new Subject();

  constructor() { }

  toggleSesion():void {
    this.loggedIn = !this.loggedIn;
    this.subject.next(this.loggedIn);
  }

  getSesionState():Observable<any> {
    return this.subject.asObservable();
  }
}

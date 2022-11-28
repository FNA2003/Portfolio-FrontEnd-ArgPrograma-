import { Component, Input } from '@angular/core';
import { aboutInterface } from 'src/app/interfaces/AboutInterface';


import { LoggInService } from 'src/app/services/logg-in.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-body-about',
  templateUrl: './body-about.component.html',
  styleUrls: ['./body-about.component.css']
})
export class BodyAboutComponent {
  @Input() about?:aboutInterface;

  sectionTitle:string = "Acerca de mi";
  pen = faPen;

  subscription?:Subscription;
  isIn:boolean = false;

  editable:boolean = false;

  constructor( private service:LoggInService ){ 
    this.subscription = this.service.getSesionState()
      .subscribe(value => {
        this.isIn = value;
      });
  }

  toggleEditable() {
    this.editable = !this.editable;
    this.isIn = !this.isIn;
  }
}

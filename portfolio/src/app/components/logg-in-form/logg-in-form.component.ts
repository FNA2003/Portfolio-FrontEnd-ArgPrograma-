import { Component } from '@angular/core';
import { LoggInService } from 'src/app/services/logg-in.service';


@Component({
  selector: 'app-logg-in-form',
  templateUrl: './logg-in-form.component.html',
  styleUrls: ['./logg-in-form.component.css']
})
export class LoggInFormComponent {  
  showForm:boolean = false;
  

  user:string = "";
  pass:string = "";
  invalid:boolean = false;


  constructor(private service:LoggInService) { 
    this.service.getSesionState()
      .subscribe(value => {
        this.showForm = value;
      })
  }



  submit() {    
    if (this.pass === "" || this.user === "") {
      this.invalid = true;
      return;
    }
    // TODO:
    console.warn("El formulario no está hecho! 'logg-in-form.component.ts'");
    this.invalid = false;
  }

  closeForm() {
    this.showForm = false;
  }
}

import { Component } from '@angular/core';

import { LoggInService } from 'src/app/services/logg-in.service';


@Component({
  selector: 'app-logg-in-form',
  templateUrl: './logg-in-form.component.html',
  styleUrls: ['./logg-in-form.component.css']
})
export class LoggInFormComponent {  
  showForm:boolean = false; // ¿Mostramos o escondemos el formulario?
  
  user:string = ""; // String con el nombre del usuario
  pass:string = ""; // String con la contraseña del usuario
  invalid:boolean = false; // Booleano que almacena si se va a mostrar un error o no


  /* Pedimos que se nos otorge el servicio de inicio */
  constructor(private service:LoggInService) {  }
  
  /* Y, esperamos el valor de la sesión para mostrar (o no) el formulario */
  ngOnInit() {
    this.service.getSesionState()
      .subscribe(value => {
        this.showForm = value;
      })
  }


  /* Aquí se supone que vamos a enviar la info al back-end (como no hay, simulamos) */
  submit() {    
    if (this.pass === "" || this.user === "") {
      this.invalid = true;
      return;
    }

    // TODO:
    console.warn("El formulario no está hecho! 'logg-in-form.component.ts'");
    this.invalid = false;
  }
  /* Alternamos el estado del formulario */
  closeForm() {
    this.showForm = !this.showForm;
  }
}

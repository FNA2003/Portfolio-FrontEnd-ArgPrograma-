import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CallDBService } from 'src/app/services/call-db.service';

import { aboutInterface } from 'src/app/interfaces/AboutInterface';


/*
 * 'about-editor.component.ts' es un script que permite editar la sección 'About'
 * de el usuario mediante el uso de formularios, solo si el usuario esta loggeado.
 * 
 * este componente es una extensión de 'body-about'
*/


@Component({
  selector: 'app-about-editor',
  templateUrl: './about-editor.component.html',
  styleUrls: ['./about-editor.component.css']
})
export class AboutEditorComponent {
  /* todos estas variables de la clase principal
   * son destinadas a leer la información que es pasada por el componente padre
   * y, poder enviar el resultado de la modificación de alguna de esta.
  */
  @Input() informacion:aboutInterface = { text:"", name:"", imgURL:"" };
  
  @Output() formToggle:EventEmitter<any> = new EventEmitter();
  @Output() baseToggle:EventEmitter<Object> = new EventEmitter();


  /* Solicitamos que se provea el servicio con el que se modifica la base de datos */
  constructor(private db:CallDBService) {}


  saveForm() {
    /* Una función que comprueba el estado de los inputs, y, si son
     * correctos, envia una solicitud a la base de datos para
     * modificar la misma y. Por último, notifica al componente padre
     * que se modifico la info (para mostrarla en pantalla sin recargar)
    */
    if (this.informacion.imgURL === "" || this.informacion.name === "" || this.informacion.text === "") {
      alert("No podés dejar todos los campos vacíos!");
      return;
    }

    this.db.updateBase("about", this.informacion).subscribe();

    this.baseToggle.emit(this.informacion);
  }
}

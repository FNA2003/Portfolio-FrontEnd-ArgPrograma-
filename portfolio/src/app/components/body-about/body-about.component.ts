import { Component } from '@angular/core';


import { LoggInService } from 'src/app/services/logg-in.service';
import { CallDBService } from 'src/app/services/call-db.service';

import { aboutInterface } from 'src/app/interfaces/AboutInterface';

import { faClose, faPen } from '@fortawesome/free-solid-svg-icons';


/* 
 * Este es el componente que muestra y permite editar la información
 * que se encuentra en la base de datos del 'About' del usuario
*/

@Component({
  selector: 'app-body-about',
  templateUrl: './body-about.component.html',
  styleUrls: ['./body-about.component.css']
})
export class BodyAboutComponent {
  /* 
   *  Las variables de esta clase solo se utilizan para almacener de alguna forma
   * la información del artículo 'About'.
   *  Y, otras se utilizan para conocer el estado del usuario y, del 'about-editor'.
  */

  sectionTitle:string = "Acerca de mi";

  about:aboutInterface = { text:"", name:"", imgURL:"" };

  pen:any = faPen;

  isIn:boolean = false;
  editable:boolean = false;


  /* Pedimos los servicios que nos permiten conocer toda acerca del usuario */
  constructor( private sesionState:LoggInService, private db:CallDBService ){  }

  /* Y, usamos los servicios para obtener la infomación */
  ngOnInit() {
    this.sesionState.getSesionState()
      .subscribe(value => {
        this.isIn = value;
      });

    this.db.getDataBase("about")
      .subscribe(obj => {
        this.about = obj;
      });
  }


  /* Función con la que podremos esconder o mostrar el formulario de edición */
  toggleEditable():void {
    this.editable = !this.editable;
    this.pen = (this.pen === faPen)? faClose : faPen;
  }

  /* Función que modifica el front-end del 'About' */
  updateView(objeto:Object):void {    
    this.about = <aboutInterface> objeto;
  }
}

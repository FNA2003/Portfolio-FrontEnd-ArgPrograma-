import { Component } from '@angular/core';

import { CallDBService } from 'src/app/services/call-db.service';
import { LoggInService } from 'src/app/services/logg-in.service';

import { proyectsInterface } from 'src/app/interfaces/proyectsInterface';

import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons';


/*
 * body-proyects muestra toda la lista de proyectos 
 * registrados en la base de datos por el usuario y, 
 * permite modificar los mismos
*/

@Component({
  selector: 'app-body-proyects',
  templateUrl: './body-proyects.component.html',
  styleUrls: ['./body-proyects.component.css']
})
export class BodyProyectsComponent {
  /*
   * Variables con todos los proyectos y array con todo el número
   * de índices del array.
   * Título de la sección, y, booleanos con información del 
   * usuario que solicito la página.
  */
  information:Array<proyectsInterface> = [];
  numberArray:Array<number> = [];

  title:string = "Proyectos";

  edit = faEdit;

  showForm:boolean = false;
  isIn:boolean = false;


  /* Solicitamos los servicios que precisamos para conocer cierta información */
  constructor(private db:CallDBService, private loggState:LoggInService) {  }

  /* Salvamos los valores de las variables inicializadas vacias */
  ngOnInit() {
    
    this.db.getDataBase("proyects")
      .subscribe(values => {
        this.information = values;

        for (let i in this.information) {
          this.numberArray.push(parseInt(i));
        }

      });

    this.loggState.getSesionState()
      .subscribe(value => {
        this.isIn = value;
      });
  }

  /* Botón para mostrar o cerrar el formulario */
  editButton() {
    this.showForm = !this.showForm;
    this.edit = (this.edit === faEdit)? faClose : faEdit;
  }
  
  /* 
   * Función para enviar a la base de datos la información
   * recibida por el usuario y, a su vez, actualizar el front-end
  */
  saveBase(objeto:Object) {
    const newObj = <proyectsInterface> objeto;
    this.db.updateBase("proyects", newObj, newObj.id).subscribe();

    this.db.getDataBase("proyects")
      .subscribe(values => {
        this.information = values;
      });
  }
  /* 
   * Función para eliminar cierto elemento de la base de datos
   * y, mostrarlo en la pantalla 
  */
  deleteBase(objeto:Object) {
    const newObj = <proyectsInterface> objeto;
    this.db.deleteElement("proyects", newObj.id).subscribe();

    this.db.getDataBase("proyects")
      .subscribe(values => {
        this.information = values;
        this.numberArray = [];

        for (let i in this.information) {
          this.numberArray.push(parseInt(i));
        }
      });
  }
}

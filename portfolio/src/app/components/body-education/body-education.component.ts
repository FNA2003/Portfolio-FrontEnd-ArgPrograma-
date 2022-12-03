import { Component } from '@angular/core';

import { CallDBService } from 'src/app/services/call-db.service';

import { educationInterface } from 'src/app/interfaces/EducationInterface';


/*
 * Componente que se encarga de mostrar la información de 
 * la educación del usuario y, modificarla.
*/


@Component({
  selector: 'app-body-education',
  templateUrl: './body-education.component.html',
  styleUrls: ['./body-education.component.css']
})
export class BodyEducationComponent {
  // Todo el array con la educación
  information:Array<educationInterface> = [];
  // Nombre de la sección
  article_name:string = "Educación";

 
  /* Buscamos los servicios necesarios */
  constructor( private db:CallDBService ) {}

  /* Para solicitar el array de educación y guardarlo */
  ngOnInit() {
    this.db.getDataBase("education")
      .subscribe(value => {
        this.information = value;
      });
  }


  /* Función que llama a la base de datos para actualizar un item de la sección de educación */
  editCourse(objeto:Object):void {
    const info = <educationInterface> objeto;
    this.db.updateBase("education", info, info?.id).subscribe();
  }
  /* Funcón que elimina un item de la base de datos */
  deleteCourse(objeto:Object):void {
    const info = <educationInterface> objeto;
    this.db.deleteElement("education", info.id).subscribe();
  }
}

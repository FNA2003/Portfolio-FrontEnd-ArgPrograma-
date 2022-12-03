import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LoggInService } from 'src/app/services/logg-in.service';

import { educationInterface } from 'src/app/interfaces/EducationInterface';

import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.css']
})
export class EducationItemComponent {
  @Input() curso:educationInterface = { origin:"", date:"", title:"", prove:"" };

  @Output() editar:EventEmitter<Object> = new EventEmitter();
  @Output() borrar:EventEmitter<Object> = new EventEmitter();

  state:boolean = false;
  showForm:boolean = false;

  edit = faEdit;
  remove = faRemove;


  /* Obtenemos los servicios necesarios */
  constructor(private loggedState:LoggInService) {  }
  /* Y, actualizamos las variables necesarias con el servicio */
  ngOnInit() {
    this.loggedState.getSesionState()
      .subscribe(value => {
        this.state = value;
      });
  }

  // Muestra o esconde el editor del item actual
  editButton():void {
    this.showForm = !this.showForm;
  }
  // Elimina el item actual, y, actualiza la página
  removeButton():void {
    this.borrar.emit(this.curso);
    
    this.curso = { origin:"", date:"", title:"", prove:"" };
  }

  // Cierra el editor
  closeButton():void {
    this.showForm = !this.showForm;
  }
  // Guarda el valor modificado del objeto
  saveButton():void {
    if (this.curso.origin === "" || this.curso.date === ""  || this.curso.title === "" ) {
        
      alert("Debes llenar todos los campos de texto!");
      return;
    }

    this.editar.emit(this.curso);
    location.reload();
  }
}

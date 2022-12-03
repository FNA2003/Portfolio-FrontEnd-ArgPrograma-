import { Component, EventEmitter, Input, Output } from '@angular/core';
import { proyectsInterface } from 'src/app/interfaces/proyectsInterface';

@Component({
  selector: 'app-proyects-item',
  templateUrl: './proyects-item.component.html',
  styleUrls: ['./proyects-item.component.css']
})
export class ProyectsItemComponent {
  // Proyecto singular a modificar
  @Input() item:proyectsInterface = { paragraph:"", imgURL:"", anchorURL:"", title:"", altText:"" };

  @Output() saveEvent:EventEmitter<Object> = new EventEmitter(); // OutEvent para salvar x proyecto
  @Output() deleteEvent:EventEmitter<Object> = new EventEmitter(); // OutEvent para borrar x proyecto
 
  
  /* Botón para emitir el cambio de estado del item */
  saveButton() {
    this.saveEvent.emit(this.item);
  }
  /* Botón para quitar x elemento de los proyectos */
  deleteButton() {
    this.deleteEvent.emit(this.item);
    this.item = { paragraph:"", imgURL:"", anchorURL:"", title:"", altText:"" };
  }
}

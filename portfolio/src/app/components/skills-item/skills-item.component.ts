import { Component, EventEmitter, Input, Output } from '@angular/core';

import { skillsInterface } from 'src/app/interfaces/SkillsInterface';

import { faDeleteLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-skills-item',
  templateUrl: './skills-item.component.html',
  styleUrls: ['./skills-item.component.css']
})
export class SkillsItemComponent {
  @Input() skill:skillsInterface = { skill_name:"", percentage:0, boostrap:"" }; // Habilidad singular a modificar

  @Output() removeEvent:EventEmitter<number> = new EventEmitter(); // Evento que le da al parentElement un indicador para borrar
  @Output() saveEvent:EventEmitter<skillsInterface> = new EventEmitter(); // Evento para salvar x elemento

  /* Íconos */
  rm = faDeleteLeft;
  save = faCheck;


  /* Botón para eliminar la habilidad  */
  removeButton() {
    this.removeEvent.emit(this.skill.id);
    this.skill = { skill_name:"", percentage:0, boostrap:"" };
  }

  /* Botón para salvar el cambio de la habilidad */
  saveButton() {
    this.saveEvent.emit(this.skill);
  }

}

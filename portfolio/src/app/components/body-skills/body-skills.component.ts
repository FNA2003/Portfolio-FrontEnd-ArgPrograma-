import { Component } from '@angular/core';

import { CallDBService } from 'src/app/services/call-db.service';
import { LoggInService } from 'src/app/services/logg-in.service';

import { skillsInterface } from 'src/app/interfaces/SkillsInterface';

import { faCheck, faClose, faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-body-skills',
  templateUrl: './body-skills.component.html',
  styleUrls: ['./body-skills.component.css']
})
export class BodySkillsComponent {
  information:Array<skillsInterface> = []; // Variable con la info de las skills (base de datos)
  
  editable:boolean = false; // Estado (logeado o no)
  showForm:boolean = false; // Estado (el botón fue precionado o no)

  title:string = "Hard & Soft Skills"; // Título del artícul

  // Íconos
  edit = faEdit;
  rm = faDeleteLeft;
  save = faCheck;


  /* Entrada de los servicios para la información */
  constructor(private db:CallDBService, private logginState:LoggInService) {  }

  /* Inicializador que escribe los datos de la base de datos y del estado del usuario */
  ngOnInit() {
    this.db.getDataBase("skills")
      .subscribe(values => {
        this.information = values;
      });
    
    this.logginState.getSesionState()
      .subscribe(value => {
        this.editable = value;
      })
  }


  /* Botón que nos permite acceder a los formularios */
  editButton() {
    this.showForm = !this.showForm;
    this.edit = (this.edit === faEdit)? faClose : faEdit;
  }
  
  /* Función que remueve x elemento de la base de datos y, actualiza el front-end */
  removeBase(id:number):void {

    this.db.deleteElement("skills", id).subscribe();

    this.db.getDataBase("skills")
      .subscribe(values => {
        this.information = values;
      });    
  }
  /* Función que actualiza la base de datos según x elemento y actualiza el front-end */
  saveBase(objeto:skillsInterface):void {
    
    this.db.updateBase("skills", objeto, objeto.id).subscribe();
    this.db.getDataBase("skills")
      .subscribe(values => {
        this.information = values;
      });
  }
}

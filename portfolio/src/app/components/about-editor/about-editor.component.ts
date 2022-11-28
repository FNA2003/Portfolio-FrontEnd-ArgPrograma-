import { Component, Input, Output, EventEmitter } from '@angular/core';
import { aboutInterface } from 'src/app/interfaces/AboutInterface';
import { CallDBService } from 'src/app/services/call-db.service';

@Component({
  selector: 'app-about-editor',
  templateUrl: './about-editor.component.html',
  styleUrls: ['./about-editor.component.css']
})
export class AboutEditorComponent {
  @Input() informacion?:aboutInterface;
  @Output() emiter:EventEmitter<any> = new EventEmitter();

  imgURL?:string;
  name?:string;
  text?:string;
  
  constructor(private db:CallDBService) {}

  ngOnInit() {
    this.imgURL = this.informacion?.imgURL;
    this.name = this.informacion?.name;
    this.text = this.informacion?.text;
  }

  closeForm() {
    this.emiter?.emit();
  }

  saveForm() {
    if (this.imgURL === "" || this.name === "" || this.text === "") {
      alert("No podés dejar todos los campos vacíos!");
      return;
    }

    // TODO:
    console.warn("The save button is not done! 'about-editor.component.ts'");
  }
}

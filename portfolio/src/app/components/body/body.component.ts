import { Component } from '@angular/core';

import { CallDBService } from 'src/app/services/call-db.service';

import { bodyInterface } from "src/app/interfaces/BodyInterface";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  arrayInfo?:bodyInterface;

  constructor(private db:CallDBService){ }

  ngOnInit() { 
    this.db.getDataBase().subscribe(values => {
      this.arrayInfo = values;
    });
  }
}

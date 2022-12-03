import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { BodyAboutComponent } from './components/body-about/body-about.component';
import { LoggInFormComponent } from './components/logg-in-form/logg-in-form.component';
import { AboutEditorComponent } from './components/about-editor/about-editor.component';
import { BodyEducationComponent } from './components/body-education/body-education.component';
import { EducationItemComponent } from './components/education-item/education-item.component';
import { BodySkillsComponent } from './components/body-skills/body-skills.component';
import { SkillsItemComponent } from './components/skills-item/skills-item.component';
import { BodyProyectsComponent } from './components/body-proyects/body-proyects.component';
import { ProyectsItemComponent } from './components/proyects-item/proyects-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    BodyAboutComponent,
    LoggInFormComponent,
    AboutEditorComponent,
    BodyEducationComponent,
    EducationItemComponent,
    BodySkillsComponent,
    SkillsItemComponent,
    BodyProyectsComponent,
    ProyectsItemComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

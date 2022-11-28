import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpClientModule } from "@angular/common/http";
import { BodyComponent } from './components/body/body.component';
import { BodyAboutComponent } from './components/body-about/body-about.component';
import { LoggInFormComponent } from './components/logg-in-form/logg-in-form.component';

import { FormsModule } from '@angular/forms';
import { AboutEditorComponent } from './components/about-editor/about-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    BodyAboutComponent,
    LoggInFormComponent,
    AboutEditorComponent
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

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


// Ruta de la base de datos
const API_URL = "http://localhost:4000/";

// Cabecera de cada petición http
const HTTTP_HEADERS = {
  headers: new HttpHeaders({
    "Content-Type":"application/json"
  })
};


@Injectable({
  providedIn: 'root'
})
export class CallDBService {
  /* Servicio que nos permite hacer requests */
  constructor(private http:HttpClient) { }


  /* Metodo 'GET', el cual nos devuelve lo que esta en la ruta especificada en la DB */
  getDataBase(resourse:string):Observable<any> {
    return this.http.get<any>(`${API_URL}${resourse}`, HTTTP_HEADERS);
  }

  /* Metodo 'PUT', el cual cambia el estado de un elemento dentro de una ruta en la DB */
  updateBase(resourse:string, body:Object, id?:number):Observable<any> {
    if (id != undefined) {
      return this.http.put<any>(`${API_URL}${resourse}/${id}`, body, HTTTP_HEADERS);
    }

    return this.http.put<any>(`${API_URL}${resourse}`, body, HTTTP_HEADERS);    
  }

  /* Metodo 'DELETE', el cual elimina un elemento de una ruta en la DB */  
  deleteElement(resourse:string, id?:number):Observable<any> {
    return this.http.delete<any>(`${API_URL}${resourse}/${id}`, HTTTP_HEADERS);
  }
}

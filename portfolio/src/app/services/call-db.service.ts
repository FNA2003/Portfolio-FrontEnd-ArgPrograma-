import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


const HTTTP_HEADERS = {
  headers: new HttpHeaders({
    "Content-Type":"application/json"
  })
};
const API_URL = "./assets/data/db.json";


@Injectable({
  providedIn: 'root'
})
export class CallDBService {

  constructor(private http:HttpClient) { }

  getDataBase():Observable<any> {
    return this.http.get<any>(API_URL, HTTTP_HEADERS);
  }
}

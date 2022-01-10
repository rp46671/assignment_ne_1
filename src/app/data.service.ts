import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DataService {

 

  constructor(private _http: HttpClient, 
    private _route: Router) {

  }
  getData(): Observable<Object> {
    let url = environment.apiur + 'posts'
    return this._http.get(url);
  }
}

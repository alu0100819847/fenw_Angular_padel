import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenService} from '../token/token.service';


@Injectable({
  providedIn: 'root'
})
export class HttpBDService  {

  private bd = 'http://fenw.etsisi.upm.es:10000/';


  constructor(private http: HttpClient, private token: TokenService) { }

  get(path: string) {
    return this.http.get(this.bd + path, {observe: 'response'});
  }

  getAuth(path: string) {
    console.log(this.token.getToken());
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token.getToken());
    return this.http.get(this.bd + path, {observe: 'response', headers});
  }

  post(path: string, data: any) {
    console.log(this.token.getToken());
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.bd + path, data, { headers });
  }

  postAuth(path: string, data: any) {
    console.log(this.token.getToken());
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token.getToken());
    return this.http.post(this.bd + path, data, { headers,  observe: 'response', });
  }

  delete(path: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token.getToken());
    return this.http.delete(this.bd + path, {headers, observe: 'response', });
  }

}

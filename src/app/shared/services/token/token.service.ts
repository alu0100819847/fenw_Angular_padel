import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {Session} from '../../models/session.models';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements CanActivate {
  token = new Session();

  constructor() { }

  tokenExist() {
    this.token.token = sessionStorage.get('token');
  }

  canActivate() {
    this.deleteToken();
    return true;
  }

  setToken(token) {
    this.token.token = token;
    this.token.loged = true;
    sessionStorage.setItem('token', token);
  }

  deleteToken(){
    this.token.token = undefined;
    this.token.loged = false;
    sessionStorage.removeItem('token');
  }

  getToken() {
    return this.token.token;
  }

  setStatus(status, msg) {
    this.token.appstatus = status;
    this.token.msg = msg;
  }

  getStatus() {
    return this.token.appstatus;
  }

  getMsg() {
    return this.token.msg;
  }

}

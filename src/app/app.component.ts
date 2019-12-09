import {Component, OnInit} from '@angular/core';
import {HttpBDService} from './shared/services/http-bd/http-bd.service';
import {Router} from '@angular/router';
import {TokenService} from './shared/services/token/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private token: TokenService) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('token')) {
      this.token.token.token = sessionStorage.getItem('token');
      this.token.token.loged = true;
    }
  }
}

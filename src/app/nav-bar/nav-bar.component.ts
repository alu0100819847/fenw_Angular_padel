import { Component, OnInit } from '@angular/core';
import {HttpBDService} from '../shared/services/http-bd/http-bd.service';
import {TokenService} from '../shared/services/token/token.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private token: TokenService) { }

  ngOnInit() {
  }

}

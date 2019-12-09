import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '../shared/services/token/token.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private router: Router, private token: TokenService) { }

  msg = this.token.getMsg();
  type: string;
  ngOnInit() {
    if (this.token.getStatus() === 4) {
      this.type = 'content_info err';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);

    }
    if (this.token.getStatus() === 3) {
      this.type = 'content_info err';
      setTimeout(() => {
        this.router.navigate(['/reserve']);
      }, 1500);
    }
    if (this.token.getStatus() === 2) {
      this.type = 'content_info done';
      setTimeout(() => {
        this.router.navigate(['/reserve']);
      }, 1500);
    }
    if (this.token.getStatus() === 1) {
      this.type = 'content_info done';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    }

  }

}

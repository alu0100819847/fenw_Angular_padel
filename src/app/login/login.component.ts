import { Component, OnInit } from '@angular/core';
import { HttpBDService } from '../shared/services/http-bd/http-bd.service';
import {Router} from '@angular/router';
import {TokenService} from '../shared/services/token/token.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;

  password: string;

  err : string;

  constructor(private httpBdService: HttpBDService, private router: Router, private token: TokenService) {
  }

  loginUser() {
    this.httpBdService.get('users/login?username=' + this.username + '&password=' + this.password)
      .subscribe(response => {
        console.log(response);
        if (response.status === 200) {
          this.token.setToken(response.headers.get('Authorization'));
          this.router.navigate(['reserve']);
        }

      }, err => {
        console.log(err);
        this.err = 'Usuario y/o contraseña incorrectos.';
      });
  }


  ngOnInit() {
    console.log(this.token.token.token);
  }

}

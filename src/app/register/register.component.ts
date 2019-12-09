import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {User} from '../shared/models/user.model';
import {HttpBDService} from '../shared/services/http-bd/http-bd.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TokenService} from '../shared/services/token/token.service';
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private httpBdService: HttpBDService, private token: TokenService, private router: Router) { }

  @ViewChild('password', {static: false}) passElm: ElementRef;
  @ViewChild('username', {static: false}) usernameElm: ElementRef;

  user = new User();
  repassword: string;
  date: any;
  validated: boolean;
  userError: string;
  userExist = true;

  checkPassword() {
    if (this.user.password !== this.repassword) {
      this.validated = true;
    } else {
      this.passElm.nativeElement.focus();
      this.validated = false;
    }
  }
  validate() {
    this.checkPassword();
    if (this.userExist) {
      this.usernameElm.nativeElement.focus();
      return false;
    }
    if (this.user.username && this.user.password && this.date && this.user.email ) {
      if (this.user.username.length > 4 && this.user.username.length < 9 && this.user.password.length > 4 ) {
        return true;
      }
    }

    return false;
  }


  createUser() {
    if (this.validate()) {
      this.httpBdService.post('users', this.user)
        .subscribe(responsePost => {
          console.log(responsePost);
          this.token.setStatus(1, 'Usuario registrado.');
          this.router.navigate(['/msg']);
        });
    }
  }

  userExists() {
    this.httpBdService.get('users/' + this.user.username)
      .subscribe(response => {
        console.log(response.status);
        if (response.status === 200) {
          this.userError = 'El usuario ya existe.';
          this.userExist = true;
        } else {
          console.log(response.status);
        }
      }, err => {
        if (err.status === 404) {
          this.userExist = false;
          this.userError = '';
        }
      });
  }

  ngOnInit() {
  }

}

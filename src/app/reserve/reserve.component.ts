import { Component, OnInit } from '@angular/core';
import {HttpBDService} from '../shared/services/http-bd/http-bd.service';
import {TokenService} from '../shared/services/token/token.service';
import {Router} from '@angular/router';
import {MyDate} from '../shared/models/date.models';
import {Reservation} from '../shared/models/reservation.models';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  constructor(private httpBdService: HttpBDService, private token: TokenService, private router: Router) { }
  status = 0;
  selectedCourt = 0;
  selectedHour: string;
  courtList = ['pista1.png', 'pista2.png', 'pista3.png', 'pista4.png'];
  date: MyDate;
  hourList = {'10:00': true, '11:00': true, '12:00': true,
              '13:00': true, '14:00': true, '15:00': true, '16:00': true, '17:00': true, '18:00': true,
              '19:00': true, '20:00': true};

  posibleHour = ['10:00', '11:00', '12:00', '13:00', '14:00',
                '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  myReserves: any;

  ngOnInit() {

    const tmpDate = new Date();
    this.date = new MyDate();
    this.date.year = tmpDate.getFullYear();
    this.date.month = tmpDate.getMonth() + 1;
    this.date.day = tmpDate.getDay() +1;

    this.httpBdService.getAuth('reservations')
      .subscribe(response => {
        if (response.status === 200) {
          this.myReserves = response.body;
          console.log(response);
        } else {
            this.token.deleteToken();
            this.token.setStatus(4, 'Operación no autorizada.');
            this.router.navigate(['/msg']);
        }
      }, err => {
        this.token.deleteToken();
        this.token.setStatus(4, 'Operación no autorizada.');
        this.router.navigate(['/msg']);
      });
  }

  getReservationInfo(date: Date) {
    this.httpBdService.getAuth('reservations/' + date.getTime())
      .subscribe(response => {
        if (response.status === 200) {
          this.token.setToken(response.headers.get('Authorization'));
          for (const notPosible in response.body) {
            console.log(notPosible);
            if (response.body[notPosible].courtId === this.selectedCourt ) {
              this.hourList[response.body[notPosible].rsvtime] = false;
            }

          }
        } else {
          if (response.status === 401) {
            this.router.navigate(['/login']);
          }
        }

        console.log(response);
      }, err => {
        this.token.deleteToken();
        this.token.setStatus(4, 'Operación no autorizada.');
        this.router.navigate(['/msg']);
      });
  }

  selectCourt(num) {
    this.selectedCourt = num +1;

    console.log(num);
    console.log(new Date(this.date.year, this.date.month - 1, this.date.day));
    this.getReservationInfo(new Date(this.date.year, this.date.month - 1, this.date.day));

    this.status = 1;
  }
  getStatus(num) {
    return this.status === num;
  }

  newDay() {
    for (const hour in this.hourList) {
      this.hourList[hour] = true;
    }
    console.log(new Date(this.date.year, this.date.month - 1, this.date.day));
    this.getReservationInfo(new Date(this.date.year, this.date.month - 1, this.date.day));
  }

  reserve() {
    const reservation = new Reservation();
    reservation.courtid = this.selectedCourt;
    reservation.rsvdatetime = new Date(this.date.year, this.date.month - 1, this.date.day, parseInt(this.selectedHour)).getTime();
    console.log(reservation.rsvdatetime);
    this.httpBdService.postAuth('reservations', { courtid: reservation.courtid, rsvdatetime: reservation.rsvdatetime  })
      .subscribe(response => {
        if(response.status === 201) {
          this.token.setStatus(2, 'Pista reservada.');
          this.router.navigate(['/msg']);
        }
        // this.token.setToken(response.headers.get('Authorization'));
      }, err => {
        if (err.status === 401) {
          this.token.deleteToken();
          this.token.setStatus(4, 'Operación no autorizada.');
          this.router.navigate(['/msg']);
        }
        if (err.status === 400) {
          this.token.setStatus(3, 'El dia seleccionado no se admiten reservas.');
          this.router.navigate(['/msg']);
        }
        if (err.status === 409) {
          this.token.setStatus(3, 'Máximo numero de reservas alcanzado');
          this.router.navigate(['/msg']);
        }
      });
  }

  deleteReserve(id: number){
    this.httpBdService.delete('reservations/' + id)
      .subscribe(response => {
        if(response.status === 204) {
          this.token.setStatus(2, 'Reserva eliminada.');
          this.router.navigate(['/msg']);
        }
      }, err => {
        console.log(err);
        if (err.status === 401) {
          this.token.deleteToken();
          this.token.setStatus(4, 'Operación no autorizada.');
          this.router.navigate(['/msg']);
        }
      });
  }

}

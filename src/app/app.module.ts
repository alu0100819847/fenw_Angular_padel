import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { IndexComponent } from './index/index.component';
import { InstallationsComponent } from './installations/installations.component';
import { ServicesComponent } from './services/services.component';
import { RegisterComponent } from './register/register.component';
import { HttpBDService} from './shared/services/http-bd/http-bd.service';
import { TokenService} from './shared/services/token/token.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReserveComponent } from './reserve/reserve.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    IndexComponent,
    InstallationsComponent,
    ServicesComponent,
    RegisterComponent,
    ReserveComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [HttpBDService, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }

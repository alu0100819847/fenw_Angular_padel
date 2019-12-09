import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {IndexComponent} from './index/index.component';
import {LoginComponent} from './login/login.component';
import {InstallationsComponent} from './installations/installations.component';
import {ServicesComponent} from './services/services.component';
import {RegisterComponent} from './register/register.component';
import {TokenService} from './shared/services/token/token.service';
import {ReserveComponent} from './reserve/reserve.component';
import {AlertComponent} from './alert/alert.component';

const routes: Routes = [
  {path: 'services', component: ServicesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'installation', component: InstallationsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reserve', component: ReserveComponent},
  {path: 'logout', canActivate: [TokenService], component: IndexComponent },
  {path: 'msg', component: AlertComponent},
  {path: '', component: IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

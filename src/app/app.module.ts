import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from "./services/user.service";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ResidanceService} from "./services/residance.service";
import {RouterModule, Routes} from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageShopComponent } from './pages/page-shop/page-shop.component';
import { PageBasketComponent } from './pages/page-basket/page-basket.component';
import { PagePaymentComponent } from './pages/page-payment/page-payment.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: PageLoginComponent, data: { showRegister: false } },
  { path: 'register', component: PageLoginComponent, data: { showRegister: true }  },
  { path: 'shop', component: PageShopComponent},
  { path: 'basket', component: PageBasketComponent},
  { path: 'payment', component: PagePaymentComponent },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageLoginComponent,
    PageShopComponent,
    PageBasketComponent,
    PagePaymentComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes,{ enableTracing: true }),
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, ResidanceService],
  bootstrap: [AppComponent],
  exports: [BsDropdownModule, TooltipModule, ModalModule]
})
export class AppModule { }

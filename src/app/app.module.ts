import { NgModule } from '@angular/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResidanceService} from './services/residance.service';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageBasketComponent } from './pages/page-basket/page-basket.component';
import { PagePaymentComponent } from './pages/page-payment/page-payment.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import {BrowserModule } from '@angular/platform-browser';
import {NavbarComponent} from './navbar/navbar.component'
import { AlertModule} from 'ngx-bootstrap';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { FilterPipe } from './pipes/filter.pipe';
import {PanierService} from './services/panier.service';
import { PrixPipe } from './pipes/prix.pipe';
import {CommandeService} from "./services/commande.service";
import { PagePublicationComponent } from './pages/page-publication/page-publication.component';
import {PublicationService} from "./services/publication.service";
import {PageShopComponent} from "./pages/page-shop/page-shop.component";
import {RechercherArticleComponent} from "./rechercher-article/rechercher-article.component";

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: PageLoginComponent, data: { showRegister: false } },
  { path: 'register', component: PageLoginComponent, data: { showRegister: true }  },
  { path: 'home', component: PageHomeComponent},
  { path: 'basket', component: PageBasketComponent},
  { path: 'payment', component: PagePaymentComponent },
  { path: 'publication', component: PagePublicationComponent },
  { path: 'shop', component: PageShopComponent },
  { path: 'recherche-article', component: RechercherArticleComponent },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,

    FilterPipe,

    PageLoginComponent,
    PageBasketComponent,
    PagePaymentComponent,
    PageNotFoundComponent,
    PageHomeComponent,
    PrixPipe,
    PagePublicationComponent,
    RechercherArticleComponent,
    PageShopComponent
  ],
  imports: [
    AlertModule,
    BsDropdownModule,
    RouterModule.forRoot(appRoutes,{ enableTracing: true }),
    BrowserModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, ResidanceService, PanierService, CommandeService, PublicationService],
  bootstrap: [AppComponent],
  exports: [BsDropdownModule, TooltipModule, ModalModule]
})
export class AppModule { }

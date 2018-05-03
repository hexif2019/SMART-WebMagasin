import { NgModule } from '@angular/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MarchandService } from './services/marchand.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import {BrowserModule } from '@angular/platform-browser';
import {NavbarComponent} from './navbar/navbar.component'
import { AlertModule} from 'ngx-bootstrap';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PrixPipe } from './pipes/prix.pipe';
import {CommandeService} from "./services/commande.service";
import { PagePublicationComponent } from './pages/page-publication/page-publication.component';
import {PublicationService} from "./services/publication.service";
import {PageShopComponent} from "./pages/page-shop/page-shop.component";
import {RechercherArticleComponent} from "./rechercher-article/rechercher-article.component";
import {ProduitsService} from "./services/produits.service";
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { PageModificationComponent } from './pages/page-modification/page-modification.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: PageLoginComponent, data: { showRegister: false } },
  { path: 'register', component: PageLoginComponent, data: { showRegister: true }  },
  { path: 'home', component: PageHomeComponent},
  { path: 'publication', component: PagePublicationComponent },
  { path: 'shop', component: PageShopComponent },
  { path: 'recherche-article', component: RechercherArticleComponent },
  { path: 'modification/:id', component: PageModificationComponent },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,

    FilterPipe,

    PageLoginComponent,
    PageNotFoundComponent,
    PageHomeComponent,
    PrixPipe,
    PagePublicationComponent,
    RechercherArticleComponent,
    PageShopComponent,
    ArticleEditorComponent,
    PageModificationComponent
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
  providers: [MarchandService, CommandeService, PublicationService, ProduitsService],
  bootstrap: [AppComponent],
  exports: [BsDropdownModule, TooltipModule, ModalModule]
})
export class AppModule { }

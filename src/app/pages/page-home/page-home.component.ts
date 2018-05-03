import { Component, OnInit } from '@angular/core';
import {Commande} from "../../models/commande";
import {CommandeService} from "../../services/commande.service";
import {MarchandService} from "../../services/marchand.service";
import {Article} from "../../models/article.model";
import {Marchand} from "../../models/marchand";
import * as _ from 'lodash';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
  marchand: Marchand;

  currentCommandes: Commande[];

  constructor(
    private marchandService: MarchandService
  ) {
    setInterval(() => this.refreshCommandes(), 10000);
  }

  ngOnInit() {
    this.marchandService.requirLogin().then(marchand =>{
      this.marchand = marchand;
      this.currentCommandes = marchand.commandes;
    });
  }

  refreshCommandes(){
    console.log("refresh!");
    this.marchandService.requirLogin().then(marchand =>{
      _.assign(this.marchand,marchand);
      this.currentCommandes = this.marchand.commandes;
    });
  }

  valider(idCommande: string){
    console.log('valide');
    this.marchandService.validerCommande(this.marchand.id, idCommande);
    this.refreshCommandes();
  }

}

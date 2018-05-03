import { Component, OnInit } from '@angular/core';
import {MarchandService} from "../../services/marchand.service";
import {Commande} from "../../models/commande";
import {PanierService} from "../../services/panier.service";
import {Magasin} from "../../models/magasin.model";
import {Article} from "../../models/article.model";
import * as _ from "lodash";

@Component({
  selector: 'app-page-basket',
  templateUrl: './page-basket.component.html',
  styleUrls: ['./page-basket.component.scss']
})
export class PageBasketComponent implements OnInit {

  panier: Commande;
  infoArticles : {article:Article, magasin:Magasin}[];

  msgError(msg: string){
    console.log(msg);
  }

  constructor(private panierService: PanierService,
              private marchandService: MarchandService) { }

  ngOnInit() {
    this.marchandService.requirLogin().then(marchand => {
      this.panierService.getPagner(marchand.id).subscribe(
        panier => {
          this.panier = panier;
          this.infoArticles = [];
          panier.magasins.forEach(magasin => {
            this.infoArticles = _.union(
              this.infoArticles,
              magasin.produits.map(article => {
                return {
                  article:article,
                  magasin:magasin
                };
              })
            );
          })
        },
        error => this.msgError('Erreur du chargement du pagnier : ' + JSON.stringify(error))
      );
    });
  }

}

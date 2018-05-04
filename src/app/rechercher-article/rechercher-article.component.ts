import {Component, OnInit} from '@angular/core';
import {Article} from "../models/article.model";
import {MarchandService} from "../services/marchand.service";
import {ProduitsService} from "../services/produits.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-rechercher-article',
  templateUrl: './rechercher-article.component.html',
  styleUrls: ['./rechercher-article.component.scss']
})
export class RechercherArticleComponent implements OnInit {
  articles: Article[];
  idMarchand;
  articleSelectioner: Article
  articleKeyWords;

  constructor(private marchandService: MarchandService,
              private produitsService: ProduitsService) {

  }

  ngOnInit() {
    this.marchandService.requirLogin().then(marchand => {
      this.idMarchand = marchand.id;
      this.articles = marchand.produits;
    });
    // this.refreshProduits();
  }

  remove(article: Article) {
    // console.log("remove success");
    this.marchandService.requirLogin().then(marchand => {
      this.produitsService.removeArticle(marchand.id, article.id).subscribe(
        () => {
          console.log("remove success");
        },
        error => this.msgError('Erreur du MAJ du produits : ' + JSON.stringify(error))
      );
    });
    this.refreshProduits();
  }

  refreshProduits() {
    console.log("refresh!");
    if (this.idMarchand) {
      this.marchandService.refreshMarchand(this.idMarchand).subscribe(marchand => {
        this.articles= marchand.produits;
      })
    }
  }

  msgError(msg: string) {

  }

  msgOk(msg: string) {

  }

}

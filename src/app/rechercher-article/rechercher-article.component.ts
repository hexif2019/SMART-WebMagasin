import { Component, OnInit } from '@angular/core';
import {Magasin} from '../models/magasin.model';
import {Article} from "../models/article.model";
import {MarchandService} from "../services/marchand.service";
import {Commande} from "../models/commande";
import {ProduitsService} from "../services/produits.service";

@Component({
  selector: 'app-rechercher-article',
  templateUrl: './rechercher-article.component.html',
  styleUrls: ['./rechercher-article.component.scss']
})
export class RechercherArticleComponent implements OnInit {
  articles: Article[];
  articleSelectioner: Article;

  constructor(
    private marchandService: MarchandService,
    private produitsService: ProduitsService
  ) {

  }

  ngOnInit() {
    this.marchandService.requirLogin().then(marchand => {
      this.articles = marchand.produits;
    });
  }

  remove(article: Article){
    // console.log("remove success");
    this.marchandService.requirLogin().then(marchand => {
      this.produitsService.removeArticle(marchand.id, article.id).subscribe(
        () => {
          console.log("remove success");
        },
        error => this.msgError('Erreur du MAJ du produits : ' + JSON.stringify(error))
      );
    });
  }

  modifier(article: Article){

  }

  msgError(msg: string){

  }

  msgOk(msg: string){

  }

}

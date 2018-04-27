import { Component, OnInit } from '@angular/core';
import {MainService} from '../services/main.service';
import {Magasin} from '../models/magasin.model';

@Component({
  selector: 'app-rechercher-article',
  templateUrl: './rechercher-article.component.html',
  styleUrls: ['./rechercher-article.component.scss']
})
export class RechercherArticleComponent implements OnInit {
  articles: any;
  magasins: any;
  keyWords: string;
  magasinSelectioner : Magasin;
  constructor(private mainService: MainService) {}

  searchArticle(keyWords: string) {
    this.mainService.rechercherArticle(keyWords).subscribe(articles => {
      this.articles = articles;
    });
  }

  searchMagasin(keyWords: string) {
    this.mainService.rechercherMagasin(keyWords).subscribe(magasins => {
      this.magasins = magasins;
    });
  }
  ajouterAuPanier() {
  }
  ngOnInit() {
  }
  selectMagasin(m: Magasin) {
    this.magasinSelectioner = m;
  }
}

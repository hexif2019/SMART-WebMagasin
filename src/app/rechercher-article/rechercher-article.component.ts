import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../services/article.service';

@Component({
  selector: 'app-rechercher-article',
  templateUrl: './rechercher-article.component.html',
  styleUrls: ['./rechercher-article.component.scss']
})
export class RechercherArticleComponent implements OnInit {
  articles: any;
  keyWords: string;
  constructor(private articleService: ArticleService) {}

  search(keyWords: string) {
    this.articleService.rechercher(keyWords).subscribe(articles => {
      this.articles = articles;
    });
  }
  ngOnInit() {
  }

}

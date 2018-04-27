import {Component, TemplateRef} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {ArticleService} from './services/article.service';
import {Article} from './models/article.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  articles: any;
  keyWords: string;
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private articleService: ArticleService) {}

  search(keyWords: string) {
    this.articleService.rechercher(keyWords).subscribe(articles => {
       this.articles = articles;
    });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Article} from "../models/article.model";

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {
  @Input() article: Article;
  @Output() onModification = new EventEmitter<Article>();
  constructor() { }

  ngOnInit() {
  }

  modifier(){
    this.onModification.emit(this.article)
  }
}

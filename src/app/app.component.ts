import {Component, TemplateRef} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {EventHandlerService} from './services/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  articles = null;
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private eventHandler: EventHandlerService) {}

  search(keyWords: string) {
    this.eventHandler.rechercher('asd').subscribe(articles => {
       this.articles = articles;
    });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}

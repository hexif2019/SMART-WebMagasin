import {Component, OnInit} from '@angular/core';
import {Article} from "../../models/article.model";
import {PublicationService} from "../../services/publication.service";
import {MarchandService} from "../../services/marchand.service";
import {ProduitsService} from "../../services/produits.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-publication',
  templateUrl: './page-publication.component.html',
  styleUrls: ['./page-publication.component.scss']
})
export class PagePublicationComponent implements OnInit {

  article: Article = {};

  msgRegisterError: string;

  signalOK = false;

  constructor(private router: Router, private publicationService: PublicationService, private marchandService: MarchandService, private produitsService: ProduitsService) {
  }

  ngOnInit() {
  }

  register() {
    this.marchandService.requirLogin().then(marchand => {
      this.publicationService.publier(marchand.id, this.article)
        .subscribe(
          article => {
            this.signalOK = true;
            console.log("PUBLICATION SUCCESS", article);
            this.router.navigateByUrl('recherche-article');
          },
          fail => {
            this.msgRegisterError = (fail.msg) || JSON.stringify(fail);
          },
        )
    })
  }

}

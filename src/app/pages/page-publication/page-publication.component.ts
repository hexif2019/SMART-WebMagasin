import { Component, OnInit } from '@angular/core';
import {Article} from "../../models/article.model";
import {PublicationService} from "../../services/publication.service";

@Component({
  selector: 'app-page-publication',
  templateUrl: './page-publication.component.html',
  styleUrls: ['./page-publication.component.scss']
})
export class PagePublicationComponent implements OnInit {

  denomination: string;
  description: string;
  prix: number;
  poids: number;
  img: string;
  volume: number;
  longeur: number;
  largeur: number;
  hauteur: number;

  msgRegisterError: string;

  signalOK = false;

  constructor(private publicationService: PublicationService) { }

  ngOnInit() {
  }

  register(){
    let newArticle: Article = {
      denomination: this.denomination,
      description: this.description,
      prix: this.prix,
      poids: this.poids,
      img: this.img,
      volume: this.volume,
      longeur: this.longeur,
      largeur: this.largeur,
      hauteur: this.hauteur,
    }
    this.publicationService.publier(newArticle)

      .subscribe(
        article =>{
          this.signalOK = true;
          console.log("PUBLICATION SUCCESS", article);
        },
        fail =>{
          this.msgRegisterError = (fail.msg) || JSON.stringify(fail);
        },
      );
  }

}

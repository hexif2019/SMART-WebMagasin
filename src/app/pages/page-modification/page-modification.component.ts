import { Component, OnInit } from '@angular/core';
import {Article} from "../../models/article.model";
import {MarchandService} from "../../services/marchand.service";
import {ProduitsService} from "../../services/produits.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page-modification',
  templateUrl: './page-modification.component.html',
  styleUrls: ['./page-modification.component.scss']
})
export class PageModificationComponent implements OnInit {

  article: Article;

  constructor(private route: ActivatedRoute, private marchandService: MarchandService, private produitsService: ProduitsService) { }

  ngOnInit(){
    this.marchandService.requirLogin().then(marchand => {
      let id;
      let articleid = this.route.paramMap.subscribe(params => {
        id = params.get('id');
      })
      this.produitsService.getProduit(marchand.id, id).subscribe(article=>{
        this.article = article;
      })
    })
  }

  modifier(){
    this.marchandService.requirLogin().then(marchand => {
      this.produitsService.updateProduit(marchand.id,this.article)
    })
  }

}

import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/';
import 'rxjs/add/operator/map';

@Injectable()
export class MainService {

  constructor(private http: HttpClient) {  }
  public rechercherArticle(keyWords: string) {
    return this.http.get('api/listProduits.json');
  }
  public rechercherMagasin(keyWords: string) {
    return this.http.get('api/listMagasins.json');
  }
}

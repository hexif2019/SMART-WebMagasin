import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/';

@Injectable()
export class EventHandlerService {

  constructor(private http: HttpClient) {  }
  articles: Article[];
  public rechercher(keyWords: string) {
    /*return this.http.get<any>('/')
      .map(dochtml => [{
          name: 'CocaCola',
          nb: 500,
          prix: 100,
          poids: 500,
          icon: 'adresse d\'icon',
          denom: 'a carbonated soft drink produced by The Coca-Cola Company'
        },
        {
          name: 'Pepsi',
          nb: 300,
          prix: 200,
          poids: 500,
          icon: 'adresse d\'icon',
          denom: 'a carbonated soft drink produced'
        }]);
  }*/
    return [{
      name: 'CocaCola',
      nb: 500,
      prix: 100,
      poids: 500,
      icon: 'adresse d\'icon',
      denom: 'a carbonated soft drink produced by The Coca-Cola Company'
    },
      {
        name: 'Pepsi',
        nb: 300,
        prix: 200,
        poids: 500,
        icon: 'adresse d\'icon',
        denom: 'a carbonated soft drink produced'
      }];
}

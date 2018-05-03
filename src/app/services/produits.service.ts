import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Article} from "../models/article.model";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {fakeapi} from "./fakeapi";
import * as _ from "lodash";
import {Marchand} from "../models/marchand";

export class ProduitsEvent{
  oldProduits: Article[];
  produits: Article[];
  cause: {
    name:string,
    msg?:string,
    data?:any
  };
}

@Injectable()
export class ProduitsService {

  private produits : Article[];
  private produitSubject: Subject<ProduitsEvent>;

  constructor(private http: HttpClient) {
    this.produitSubject = new Subject<ProduitsEvent>();
    this.produitSubject.subscribe(
      produitsEvent => this.produits = produitsEvent.produits
    );
  }

/*  public getCurrentProduits(): Article[]{
    return this.produits;
  }*/

  public setProduits(produits: Article[],  eventName: string, eventMsg ?: string, eventData ?: any): void{
    this.produitSubject.next(
      {
        oldProduits: this.produits,
        produits: produits,
        cause: {
          name: eventName,
          msg: eventMsg,
          data: eventData
        }
      }
    );
  }

  public updateProduit(produit: Article, marchandid: string): Observable<any>{
    let ret = fakeapi(
      this.http.get<any>('api/article.json'),
      this.http.post<any>('/api/updateProduit', {produit:produit, idMagasin: marchandid})
    );
    return ret;
  }

 /* public getProduits(marchandid: string): Observable<Article[]>{
    let ret = fakeapi(
      this.http.get<Article[]>('api/listProduits.json'),
      this.http.get<Article[]>('api/getProduits/'+marchandid)
    ).map(
      produits => {
        if(!_.isEqual(produits, this.produits)){
          this.setProduits(
            produits,
            this.produits ? "reLoad" : "load",
            this.produits ? "Votre panier a étais changer par une autre page!" : "Panier charger"
          );
        };
        return produits;
      }
    )
    ret.subscribe();
    return ret;
  }*/

  public getProduit(marchandid: string, produitid: string): Observable<Article>{
    let ret = fakeapi(
      this.http.get<Article>('api/article.json'),
      this.http.get<Article>('api/getProduits/'+marchandid+'/'+produitid)
    );
    ret.subscribe();
    return ret;
  }

  public removeArticle(marchandid: string, articleid: string):Observable<string>{
    let ret = fakeapi(
      this.http.get<string>('api/article.json'),
      this.http.get<string>('api/deleteProduit'+'/'+marchandid+'/'+articleid)
    );
    ret.subscribe();
    return ret;
  }

}

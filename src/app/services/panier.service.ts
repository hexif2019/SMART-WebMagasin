import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import {HttpClient} from '@angular/common/http';
import {Observable, Observer, Subject} from 'rxjs/';
import 'rxjs/add/operator/map';
import {Magasin} from "../models/magasin.model";
import {fakeapi} from "./fakeapi";
import {Commande} from "../models/commande";
import * as _ from "lodash";

export class PanierEvent{
  oldPagnier: Commande;
  panier: Commande;
  cause: {
    name:string,
    msg?:string,
    data?:any
  };
}

@Injectable()
export class PanierService {

  private panier : Commande;
  private panierSubject: Subject<PanierEvent>;

  constructor(private http: HttpClient) {
    this.panierSubject = new Subject<PanierEvent>();
    this.panierSubject.subscribe(
      panierEvent => this.panier = panierEvent.panier
    );
  }

  public getCurrentPanier(): Commande{
    return this.panier;
  }

  public setPanier(panier: Commande,  eventName: string, eventMsg ?: string, eventData ?: any): void{
    this.panierSubject.next(
      {
        oldPagnier: this.panier,
        panier: panier,
        cause: {
          name: eventName,
          msg: eventMsg,
          data: eventData
        }
      }
    );
  }

  public onChangePanier(): Observable<PanierEvent>{
    return this.panierSubject;
  }


  public getPagner(userid: string): Observable<Commande>{
    return fakeapi(
      this.http.get<Commande>('api/commande.json'),
      this.http.get<Commande>('api/getPanier/${userid}')
    ).map(
      commande => {
        if(!_.isEqual(commande, this.panier)){
          this.setPanier(
            commande,
            this.panier ? "reLoad" : "load",
            this.panier ? "Votre panier a étais changer par une autre page!" : "Panier charger"
          );
        };
        return commande;
      }
    )
  }

  public getMagasinsOfResidence(residenceid: string){
    return fakeapi(
      this.http.get<Magasin[]>('api/listMagasins.json'),
      this.http.get<Magasin[]>('api/getMagasinsOfResidence/${residenceid}')
    )
      .map(magasins => {
        magasins.forEach(magasin =>{
           magasin.produits.forEach(produit => {
             produit.display = {
               isBuyed: false
             };
           });
        });
        return magasins;
      });
  }

  public updatePanier(userid: string,panier: Commande,  eventName: string, eventMsg ?: string, eventData ?: any): Observable<Commande>{
    return fakeapi(
      this.http.get<Commande>('api/commande.json'),
      this.http.post<Commande>('api/updatePanier/$(userid)', panier)
    ).map(panier => {
      this.setPanier(panier,  eventName, eventMsg, eventData);
      return panier;
    })
  }

  public addArticle(userid: string, magasin: Magasin, article: Article, qte: number):Observable<Commande>{
    return Observable.create(observer => {
      this.getPagner(userid).subscribe(
        panier => {
          let magasinCommande = panier.magasins.find(magasinCommande => magasinCommande.id === magasin.id );
          if(!magasinCommande){ //pas de magasin dans cette commande
            panier.magasins.push(magasinCommande = _.cloneDeep(magasin));
            magasinCommande.produits = [];
          }

          let articleCommande = magasinCommande.produits.find(produit => produit.denomination === article.denomination );
          if(!articleCommande){
            magasinCommande.produits.push(articleCommande = _.cloneDeep(article));
            articleCommande.nb = qte;
          }else{
            articleCommande.nb += qte;
          }

          this.updatePanier(userid,panier,  "addArticle", "Article ajouter", articleCommande).subscribe(
            next => { observer.next(next); observer.complete();},
            error => observer.error(error)
          )
        },
        error => observer.error(error)
      )
    });
  }

  public removeArticle(userid: string, magasin: Magasin, article: Article):Observable<Commande>{
    return Observable.create(observer => {
      this.getPagner(userid).subscribe(
        panier => {
          let magasinCommande = panier.magasins.find(magasinCommande => magasinCommande.id === magasin.id );
          if(!magasinCommande){ //pas de magasin dans cette commande
            return observer.error("Cette article n'est plus dans votre pagnier");
          }
          let articleCommande: Article[] = _.remove(magasinCommande.produits,produit => (<Article>produit).denomination === article.denomination );
          if(!articleCommande.length){
            return observer.error("Cette article n'est plus dans votre pagnier");
          }

          this.updatePanier(userid,panier,  "removeArticle", "Article suprimer", articleCommande).subscribe(
            next => { observer.next(next); observer.complete();},
            error => observer.error(error)
          )
        },
        error => observer.error(error)
      )
    });
  }

  public changeQteArticle(userid: string, magasin: Magasin, article: Article, qte: number):Observable<Commande>{
    if(qte < 1) return this.removeArticle(userid, magasin, article);
    return Observable.create(observer => {
      this.getPagner(userid).subscribe(
        panier => {
          let magasinCommande = panier.magasins.find(magasinCommande => magasinCommande.id === magasin.id );
          if(!magasinCommande){ //pas de magasin dans cette commande
            return observer.error("Cette article n'est plus dans votre pagnier");
          }

          let articleCommande = magasinCommande.produits.find(produit => produit.denomination === article.denomination );
          if(!articleCommande){
            return observer.error("Cette article n'est plus dans votre pagnier");
          }

          articleCommande.nb = qte;

          this.updatePanier(userid,panier,  "changeQteArticle", "Panier mis à jour", articleCommande).subscribe(
            next => { observer.next(next); observer.complete();},
            error => observer.error(error)
          )
        },
        error => observer.error(error)
      )
    });
  }

}

import {Injectable} from '@angular/core';
import {Article} from "../models/article.model";
import {Subject} from 'rxjs';
import {fakeapi} from "./fakeapi";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PublicationService {

  private loginSubject: Subject<Article>;
  private article: Article;

  constructor(private http: HttpClient) {
    this.loginSubject = new Subject<Article>();
  }

  publier(marchandid: string, article: Article): Observable<string> {
    let ret = fakeapi(
      this.http.get<any>("/api/article.json"),
      this.http.post<any>('/api/updateProduit', {produit:article, marchandid: marchandid})
    )
    ret.subscribe();
    return ret;
  }

}

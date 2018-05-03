import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Marchand} from '../models/marchand';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {fakeapi} from "./fakeapi";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import {Commande} from "../models/commande";

@Injectable()
export class MarchandService {

  private marchand:Marchand;

  private loginSubject: Subject<Marchand>;
  private logoutSubject: Subject<Marchand>;
  private tokenObservable: Observable<Marchand>;

  private tokenLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ){
    window['wMarchandService'] = this;
    let token = localStorage.getItem('token');
    let marchandEmail = localStorage.getItem('marchandEmail');
    this.loginSubject = new Subject<Marchand>();
    this.logoutSubject = new Subject<Marchand>();
    if(token && marchandEmail){
      this.tokenObservable = this.loadToken(token, marchandEmail);
    }
  }

  private forceLogin(){
    this.router.navigateByUrl('/login');
  }

  getMarchand(): Marchand{
    return this.marchand;
  }

  requirLogin(): Promise<Marchand>{
    return new Promise<Marchand>(executor => {
      if(this.marchand){
        executor(this.marchand);
      }else if(this.tokenLoading){
        this.tokenObservable.subscribe(
          marchand => {
            executor(marchand);
          },
          error => this.forceLogin()
        )
      }else{
        this.forceLogin();
      }
    })
  }

  loadToken(token: string, email: string): Observable<Marchand>{
    this.tokenLoading = true;
    let ret = fakeapi(
      this.http.get<Marchand>("/api/authenticateMarchand.json"),
      this.http.post<Marchand>('/api/authenticateToken', { email: email, token: token })
    ).map(
      marchand => {
        this.marchand = marchand;

        this.tokenLoading = false;

        this.loginSubject.next(marchand);
        return marchand;
      });
    ret.subscribe(_=> this.tokenLoading = false );
    return ret;
  }

  login(email: string, password: string): Observable<Marchand>{
    let ret = fakeapi(
      this.http.get<any>("/api/authenticateMarchand.json"),
      this.http.post<any>('/api/authenticateMarchand', { email: email, password: password })
    )
      .map(data => {

        if (data && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('marchandEmail', data.marchand.email);
        }

        this.marchand = data.marchand;

        return this.marchand;
      });
    ret.subscribe(marchand => {
      console.log("ret.subscribe");
      this.loginSubject.next(marchand);
    });
    return ret;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('marchandEmail');
    this.logoutSubject.next(this.marchand);
    delete this.marchand;
    this.router.navigateByUrl('/login');
  }

  refreshMarchand(idMarchand: string): Observable<Marchand>{
    let ret = fakeapi(
      this.http.get<any>("/api/marchand.json"),
      this.http.get<any>('/api/getMarchand/'+idMarchand)
    )
    ret.subscribe();
    return ret;
  }

  register(marchand: Marchand, password: string): Observable<Marchand>{
    let ret = fakeapi(
      this.http.get<any>("/api/authenticateMarchand.json"),
      this.http.post<any>('/api/register', { marchand: marchand, password: password })
        .map(data => {

          if (data && data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('marchandEmail', data.marchand.email);
          }

          this.marchand = data.marchand;

          return this.marchand;
        })
    );
    ret.subscribe(marchand => {
      this.loginSubject.next(marchand);

    });
    return ret;
  }

  onLogin(): Observable<Marchand>{
    return this.loginSubject;
  }

  onLogout(): Observable<Marchand>{
    localStorage.removeItem('token');
    localStorage.removeItem('marchandEmail');
    return this.logoutSubject;
  }

  validerCommande(idMarchand: string, idCommande: string){
    let ret = fakeapi(
      this.http.get<any>("/api/validation.json"),
      this.http.get<any>('/api/validation/'+idMarchand+'/'+idCommande)
    )
    ret.subscribe();
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {fakeapi} from "./fakeapi";

@Injectable()
export class UserService {

  private user:User;

  private loginObservable: Observable<User>;
  private logoutObservable: Observable<User>;
  private loginObserver: Observer<User>;
  private logoutObserver: Observer<User>;

  constructor(
    private http: HttpClient,
  ){
    let token = localStorage.getItem('token');
    let userEmail = localStorage.getItem('userEmail');
    this.loginObservable = Observable.create(observer => {this.loginObserver = observer});
    this.logoutObservable = Observable.create(observer => {this.logoutObserver = observer});
    if(token && userEmail){
      this.loadToken(token, userEmail);
    }
  }

  getUser(): User{
    return this.user;
  }

  loadToken(token: string, email: string): Observable<User>{
    let ret = //fakeapi(
      //this.http.get<any>("/api/authenticate.json"),
      this.http.post<User>('/api/authenticateToken', { email: email, token: token })
    //);
    ret.subscribe(user => {
      this.loginObserver.next(user);
      this.loginObserver.complete();
    });
    this.loginObserver.complete();
    return ret;
  }

  login(email: string, password: string): Observable<User>{
    let ret = fakeapi(
      this.http.get<any>("/api/authenticate.json"),
      this.http.post<any>('/api/authenticate', { email: email, password: password })
        .map(data => {

          if (data && data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userEmail', data.user.email);
          }
          return (<User>data.user);
        })
    );
    ret.subscribe(user => {
      this.loginObserver.next(user);
      this.loginObserver.complete();

    });
    return ret;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    this.logoutObserver.next(this.user);
    this.logoutObserver.complete();
    delete this.user;
  }

  register(user: User, password: string): Observable<User>{
    let ret = fakeapi(
      this.http.get<any>("/api/authenticate.json"),
      this.http.post<any>('/api/register', { user: user, password: password })
        .map(data => {

          if (data && data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userEmail', data.user.email);
          }
          return (<User>data.user);
        })
    );
    ret.subscribe(user => {
      this.loginObserver.next(user);
      this.loginObserver.complete();

    });
    return ret;
  }

  onLogin(): Observable<User>{
    return this.loginObservable;
  }

  onLogout(): Observable<User>{
    return this.logoutObservable;
  }

}

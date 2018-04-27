import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {User} from "../modal/user";

@Injectable()
export class UserService {

  private user:User;

  constructor(private http: HttpClient) {
    let token = localStorage.getItem('token');
    if(token){
      this.loadToken(token);
    }
  }

  getUser(): User{
    return this.user;
  }

  loadToken(token: string){
    /*return this.http.post<User>('/api/authenticate', { email: email, password: password })
    return this.http.get<any>('/api/loadUser')*/
  }

  login(email: string, password: string) {
    return this.http.post<any>('/api/authenticate', { email: email, password: password })
      .map(data => {
        if (data && data.token) {
          localStorage.setItem('token', JSON.stringify(data.token));
        }
        return data.user;
      });

  }

  logout() {
    localStorage.removeItem('currentUser');
    delete this.user;
  }

  register(user: User, password: string){
    return this.http.post<User>('/api/register', { user: user, password: password })
      .map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.user = user;
        }
        return user;
      });
  }

}

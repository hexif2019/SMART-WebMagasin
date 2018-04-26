import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {User} from "../modal/user";

@Injectable()
export class UserService {

  private user:User;

  constructor(private http: HttpClient) {
    let localStorageUser = localStorage.getItem('currentUser');
    if(localStorageUser){
      this.user = JSON.parse(localStorageUser);
    }
  }

  getUser(): User{
    return this.user;
  }

  login(username: string, password: string) {
    //TODO ONAPI return this.http.post<User>('/api/authenticate', { username: username+"", password: password+"" })
    return this.http.get<User>('/api/authenticate.json') //TODO RM ONAPI
      .map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.user = user;
        }

        return user;
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

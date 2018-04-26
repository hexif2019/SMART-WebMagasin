import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../modal/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  loadLogin = false;
  msgError: string;
  showRegister = false;

  @Output() onLogin = new EventEmitter<User>();

  constructor(private userSvice: UserService) { }

  ngOnInit() {
  }

  login(){
    this.loadLogin = true;
    this.userSvice.login(this.email,this.password)

      .subscribe(
        user =>{
          this.onLogin.emit(user);
        },
        fail =>{
          this.msgError = JSON.stringify(fail);
        },
        ()=>{
          this.loadLogin = false;
        }
      );
  }
  submit(){
    this.showRegister ? this.register() : this.login();
  }

  register(){
    this.loadLogin = true;
    let user: User;
    /*user={

    }
    this.userSvice.register(this.username,this.password)

      .subscribe(
        user =>{
          this.onLogin.emit(user);
        },
        fail =>{
          this.msgError = JSON.stringify(fail);
        },
        ()=>{
          this.loadLogin = false;
        }
      );*/
  }
}

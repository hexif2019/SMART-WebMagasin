import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  loadLogin = false;
  msgError: string;

  constructor(private userSvice: UserService) { }

  ngOnInit() {
  }

  login(){
    this.loadLogin = true;
    this.userSvice.login(this.username,this.password)

      .subscribe(
        user =>{

        },
        fail =>{
          this.msgError = JSON.stringify(fail);
        },
        ()=>{
          this.loadLogin = false;
        }
      );
  }
}

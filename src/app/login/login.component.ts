import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MarchandService} from "../services/marchand.service";
import {Marchand} from "../models/marchand";
import {FormControl} from "@angular/forms";
import {Residence} from "../models/residence";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  residances: Residence[] = [];

  nom: string;
  prenom: string;
  email: string;
  password: string;
  residance: Residence;

  loadLogin = false;
  msgLoginError: string;
  msgRegisterError: string;
  @Input() showRegister: boolean;

  codepostal = new FormControl();
  valideCp = false;
  loadResidance = false;

  @Output() onLogin = new EventEmitter<Marchand>();

  constructor(private marchandService: MarchandService) {

    this.codepostal.valueChanges.subscribe((value) => {
      this.valideCp = /^[0-9]{5}$/.test(value);
      if(this.valideCp){
        this.loadResidance = true;
      }else{
        this.residances = [];
      }
    });
  }
  login(){
    this.loadLogin = true;
    this.marchandService.login(this.email,this.password)

      .subscribe(
        marchand =>{
          console.log("LOGIN SUCCESS", marchand);
          this.onLogin.emit(marchand);
        },
        fail =>{
          this.msgLoginError = JSON.stringify(fail);
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
    /*this.loadLogin = true;
    let newMarchand: Marchand = {
      nom: this.nom,
      prenom: this.prenom,
      residence: this.residance,
      email: this.email
    }
    this.marchandService.register(newMarchand,this.password)

      .subscribe(
        marchand =>{
          console.log("REGISTER SUCCESS", marchand);
          this.onLogin.emit(marchand);
        },
        fail =>{
          this.msgRegisterError = (fail.msg) || JSON.stringify(fail);
        },
        ()=>{
          this.loadLogin = false;
        }
      );*/
  }
}

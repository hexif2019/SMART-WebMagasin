import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {

  showRegister

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.showRegister = this.route.snapshot.data['showRegister']
  }

  onLogin(){

  }

}

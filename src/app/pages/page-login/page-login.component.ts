import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {

  showRegister: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.showRegister = this.route.snapshot.data['showRegister']
  }

  onLogin(){
    console.log("goto /home");
    this.router.navigateByUrl('/home');
  }

}

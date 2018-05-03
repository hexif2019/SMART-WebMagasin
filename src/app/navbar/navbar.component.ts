import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Marchand} from "../models/marchand";
import {MarchandService} from "../services/marchand.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  marchand: Marchand | null;

  constructor(
    private router: Router,
    private marchandService: MarchandService
  ) {
  }

  ngOnInit() {
    this.marchandService.onLogin().subscribe(marchand => {
      this.marchand = marchand;
      console.log("nav marchand login!");
    });
    this.marchandService.onLogout().subscribe(marchand => {
      this.marchand = null;
      console.log("nav marchand logout!");
    });
    this.marchand = this.marchandService.getMarchand();
  }

  logout(){
    this.marchandService.logout();
  }



}

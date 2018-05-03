import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MarchandService} from "../../services/marchand.service";

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {

  showRegister: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private marchandService: MarchandService) { }

  ngOnInit() {
    this.showRegister = this.route.snapshot.data['showRegister'];
    if(this.marchandService.getMarchand()){
      this.router.navigateByUrl('/home');
    }
    this.marchandService.onLogin().subscribe(
      marchand => this.router.navigateByUrl('/home')
    );

  }

  onLogin(){
    //this.router.navigateByUrl('/home');
  }

}

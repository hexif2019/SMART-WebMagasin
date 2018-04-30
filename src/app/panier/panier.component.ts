import { Component, OnInit } from '@angular/core';
import {PanierService} from '../services/panier.service';
import {UserService} from '../services/user.service';
import {Commande} from '../models/commande';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  panier: Commande;

  msgError(msg: string){
    console.log(msg);
  }

  constructor(private panierService: PanierService,
              private userService: UserService) { }

  ngOnInit() {
    let user = this.userService.getUser();
    this.panierService.getPagner(user.id).subscribe(
      panier => this.panier = panier,
      error => this.msgError('Erreur du chargement du pagnier : ' + JSON.stringify(error))
    );
  }

}

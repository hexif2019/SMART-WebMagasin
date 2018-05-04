import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {fakeapi} from "./fakeapi";
import {Commande} from "../models/commande";

@Injectable()
export class CommandeService {

  constructor(private http: HttpClient) {

  }

  private getStatusDisplayCommande(statut: string): any{
    switch (statut){
      case 'EDITION': return {etat: "danger", title: "Panier!"}; // (nomrmalement imposible)
      case 'PAYEMENT_EFFECTUE':
      case 'ATTENTE_CONFIRMATION_MAGASIN': return {etat: "success", title: "En attente de la confirmation des magasins", titleOne : "En attente de la confirmation du magasin"};
      case 'ANNULATION_CLIENT': return {etat: "danger", title: "Vous avez annulé la commande", titleOne : "Vous avez annulé la commande" };
      case 'ANNULATION_SYSTEM': return {etat: "danger", title: "Votre commande ne peut pas être livrée à l'heure voulue", titleOne : "Votre commande ne peut pas être livrée à l'heure voulue" };
      case 'ANNULATION_MAGASIN': return {etat: "danger", title: "Les magasins n'ont pas pus fournir les articles voulus", titleOne: "Le magasin n'a pas pus fournir les articles voulus" };
      case 'VALIDE_MAGASINS_MAIS_MODIF': return {etat: "warning", title: "Certains articles de votre commande on été modifié par un magasin", titleOne: "Certains articles de votre commande ont été modifiés par le magasin" };
      case 'ATTRIBUE_A_COURSIER': return {etat: "success", title: "Votre commande va bientôt arriver"};
      case 'EN_COURS_DE_LIVRAISON': return {etat: "success", title: "Votre commande est en cours de livraison"};
      case 'DANS_CASIER': return {etat: "success", title: "Votre commande vous attends"};
      case 'RECUPERE_CLIENT': return {etat: "success", title: "Terminée"};
      case 'CASIER_TIMEOUT': return {etat: "danger", title: "Vous n'avais pas récuperé votre commande!"};
      default: return {etat: "danger", title: "Unknowd! : " + (statut || "undefined")}
    }
  }

  private getStatusDisplayCommandeMagasin(statut: string): any{
    switch (statut){
      case 'EDITION': return {etat: "danger", title: "Panier!"}; // (nomrmalement imposible)
      case 'PAYEMENT_EFFECTUE':
      case 'ATTENTE_CONFIRMATION_MAGASIN': return {etat: "warning", title: "Attente de confirmation"};
      case 'ANNULATION_CLIENT': return {etat: "danger", title: "Annulée" };
      case 'ANNULATION_SYSTEM': return {etat: "danger", title: "Annulée"};
      case 'ANNULATION_MAGASIN': return {etat: "danger", title: "Annulée par le magasin"};
      case 'VALIDE_MAGASINS_MAIS_MODIF': return {etat: "warning", title: "Modifiée"};
      case 'ATTRIBUE_A_COURSIER': return {etat: "success", title: "En attente du livreur"};
      case 'EN_COURS_DE_LIVRAISON': return {etat: "success", title: "En livraison"};
      case 'DANS_CASIER': return {etat: "success", title: "Livrée"};
      case 'RECUPERE_CLIENT': return {etat: "success", title: "Livrée"};
      case 'CASIER_TIMEOUT': return {etat: "success", title: "Livrée"};
      default: return {etat: "danger", title: "Unknown : " + (statut || "undefined")}
    }
  }

  private addCommandesDiplayData(commandes: Commande[]): Commande[]{
    commandes.forEach(commande => this.addCommandeDiplayData(commande));
    return commandes;
  }

  private addCommandeDiplayData(commande: Commande): Commande{
    commande.magasins.forEach(magasin => {
      magasin.display = {
        status: this.getStatusDisplayCommandeMagasin(magasin.etat)
      }
    });
    commande.display={
      status: this.getStatusDisplayCommande(commande.etat)
    }
    return commande;
  }

  getCommandesEnCour(userid: string){
    return fakeapi(
      this.http.get<Commande[]>('/api/commandes.json'),
      this.http.get<Commande[]>('/api/getCommandesEnCour/${userid}')
    ).map(commandes => this.addCommandesDiplayData(commandes))
  }

  getCommandesArchiver(id: string) {
    return fakeapi(
      this.http.get<Commande[]>('/api/commandes.json'),
      this.http.get<Commande[]>('/api/getCommandesArchiver/${userid}')
    ).map(commandes => this.addCommandesDiplayData(commandes))
  }

  getLastCommandes(id: string) {
    return fakeapi(
      this.http.get<Commande[]>('/api/commandes.json'),
      this.http.get<Commande[]>('/api/getLastCommandes/${userid}')
    ).map(commandes => this.addCommandesDiplayData(commandes))
  }
}

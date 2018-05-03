import {Article} from "./article.model";
import {Commande} from "./commande";

export class Marchand{
  id?: string;
  adresse?:string;
  description?: string;
  denomination?: string;
  email?: string;
  ville?:string;
  codePostal?:string;
  produits?: Article[];
  commandes?: Commande[]
}

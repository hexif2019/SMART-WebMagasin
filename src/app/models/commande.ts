import {Magasin} from "./magasin.model";
import {User} from "./user";
import {Residence} from "./residence";

export class Commande{
  id?: string;
  magasins?: Magasin[];
  etat?: string;
  user?: User;
  residence?: Residence;
}


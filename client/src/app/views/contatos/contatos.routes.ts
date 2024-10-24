import { Routes } from "@angular/router";
import { ListagemContatosComponent } from "./listar/listagem-contatos.component";

export const contatosRoutes: Routes = [
  { path: '', redirectTo:'listar',pathMatch:'full' },
  { path: 'listar', component: ListagemContatosComponent },
];

import { ResolveFn, Routes } from "@angular/router";
import { ListagemCompromissosComponent } from "./listar/listagem-compromissos.component";
import { ListarCompromissoViewModel } from "./models/compromisso.models";
import { inject } from "@angular/core";
import { CompromissoService } from "./service/compromisso.service";

const listagemCompromissosResolver: ResolveFn<ListarCompromissoViewModel[]> = () => {
  return inject(CompromissoService).selecionarTodos();
}

export const compromissosRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemCompromissosComponent,
    resolve: {
      compromissos: listagemCompromissosResolver
    }
  },
];

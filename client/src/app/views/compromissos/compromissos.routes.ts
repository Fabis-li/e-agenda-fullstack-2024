import { ResolveFn, Routes } from "@angular/router";
import { ListagemCompromissosComponent } from "./listar/listagem-compromissos.component";
import { ListarCompromissoViewModel } from "./models/compromisso.models";
import { inject } from "@angular/core";
import { CompromissoService } from "./service/compromisso.service";
import { CadastroCompromissoComponent } from "./cadastrar/cadastro-compromisso.component";
import { listagemContatosResolver } from "../contatos/services/listagem-contato.resolver";

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
  { path: 'cadastrar',
    component: CadastroCompromissoComponent,
    resolve: { contatos: listagemContatosResolver}
  },
];

import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { ListagemContatosComponent } from './listar/listagem-contatos.component';
import { ContatoService } from './services/contato.service';
import { inject } from '@angular/core';
import { ListarContatoViewModel, VisualizarContatoViewModel } from './models/contato.models';
import { CadatroContatoComponent } from './cadastrar/cadatro-contato.component';
import { EdicaoContatoComponent } from './editar/edicao-contato.component';
import { ExclusaoContatoComponent } from './excluir/exclusao-contato.component';

const listagemContatosResolver: ResolveFn<ListarContatoViewModel[]> = () => {
  return inject(ContatoService).selecionarTodos();
};

const visualizarContatoResolver: ResolveFn<VisualizarContatoViewModel> = (
  route:ActivatedRouteSnapshot
) => {
  const id = route.params['id'];

  return inject(ContatoService).selecionarPorId(id)
}

export const contatosRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemContatosComponent,
    resolve: {
      contatos: listagemContatosResolver,
    },
  },

  { path: 'cadastrar', component: CadatroContatoComponent},
  { path: 'editar/:id', component: EdicaoContatoComponent,
    resolve: {
      contato: visualizarContatoResolver,
    }
  },

  { path: 'excluir/:id', component: ExclusaoContatoComponent,
    resolve: {
      contato: visualizarContatoResolver,
    }
  },
];

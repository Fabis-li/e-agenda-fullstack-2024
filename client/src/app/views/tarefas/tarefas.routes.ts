import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { ListagemTarefaComponent } from "./listar/listagem-tarefa.component";
import {  ListarTarefasViewsModel, VisualizarTarefaviewModel } from "./models/tarefa.models";
import { TarefaService } from "./service/tarefa.service";
import { inject } from "@angular/core";
import { CadastroTarefaComponent } from "./cadastrar/cadastro-tarefa.component";
import { EdicaoTarefaComponent } from "./editar/edicao-tarefa.component";

import { ExclusaoTarefaComponent } from "./excluir/exclusao-tarefa.component";

const listagemTarefasResolver: ResolveFn<ListarTarefasViewsModel[]> = () => {
  return inject(TarefaService).selecionarTodos();
}

const visuzalizarTarefaResover: ResolveFn<VisualizarTarefaviewModel> = (route: ActivatedRouteSnapshot) => {
 const id= route.params['id'];

 return inject(TarefaService).selecionarPorId(id);
}


export const tarefasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemTarefaComponent,
    resolve: { tarefas: listagemTarefasResolver }
  },
  {
    path: 'cadastrar',
    component: CadastroTarefaComponent,
    resolve: { tarefas: listagemTarefasResolver }

  },
  {
    path: 'editar/:id',
    component: EdicaoTarefaComponent,
    resolve: { tarefas: visuzalizarTarefaResover,  }
  },
  {
    path: 'excluir/:id',
    component: ExclusaoTarefaComponent,
    resolve: { tarefas: visuzalizarTarefaResover }

  }
]

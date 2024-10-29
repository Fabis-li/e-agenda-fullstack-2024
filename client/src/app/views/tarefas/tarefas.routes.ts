import { ResolveFn, Routes } from "@angular/router";
import { ListagemTarefaComponent } from "./listar/listagem-tarefa.component";
import { ListarTarefasViewsModel } from "./models/tarefa.models";
import { TarefaService } from "./service/tarefa.service";
import { inject } from "@angular/core";

const listagemTarefasResolver: ResolveFn<ListarTarefasViewsModel[]> = () => {
  return inject(TarefaService).selecionarTodos();
}

export const tarefasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemTarefaComponent,
    resolve: { tarefas: listagemTarefasResolver }
  }
]

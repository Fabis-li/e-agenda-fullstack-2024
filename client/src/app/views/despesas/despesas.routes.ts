import { ResolveFn, Routes } from "@angular/router";
import { ListagemDespesasComponent } from "./listar/listagem-despesas.component";
import { ListarDespesaViewModel } from "./models/despesa.models";
import { inject } from "@angular/core";
import { DespesaService } from "./service/despesa.service";

const listagemDespesasResolver: ResolveFn<ListarDespesaViewModel[]> = () => {
  return inject(DespesaService).selecionarTodos();
}

export const despesasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full'},
  {
    path: 'listar',
    component: ListagemDespesasComponent,
    resolve: { despesas: listagemDespesasResolver }
  }
]

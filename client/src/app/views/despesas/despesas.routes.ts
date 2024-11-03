import { ResolveFn, Routes } from "@angular/router";
import { ListagemDespesasComponent } from "./listar/listagem-despesas.component";
import { ListarDespesaViewModel } from "./models/despesa.models";
import { inject } from "@angular/core";
import { DespesaService } from "./service/despesa.service";
import { CadastroDespesaComponent } from "./cadastro/cadastro-despesa.component";
import { listagemCategoriasResolver } from "../categorias/categorias.routes";
import { EdicaoDespesaComponent } from "./editar/edicao-despesa.component";

const listagemDespesasResolver: ResolveFn<ListarDespesaViewModel[]> = () => {
  return inject(DespesaService).selecionarTodos();
}

export const despesasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full'},
  {
    path: 'listar',
    component: ListagemDespesasComponent,
    resolve: { despesas: listagemDespesasResolver }
  },
  {
    path: 'cadastrar',
    component: CadastroDespesaComponent,
    resolve: { categorias: listagemCategoriasResolver}
  },
  {
    path: 'editar/:id',
    component: EdicaoDespesaComponent,
    resolve: { categorias: listagemCategoriasResolver}
  }
]

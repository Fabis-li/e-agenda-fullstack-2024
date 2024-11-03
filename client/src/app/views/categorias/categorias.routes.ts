import { ResolveFn, Routes } from "@angular/router";
import { ListagemCategoriasComponent } from "./listar/listagem-categorias.component";
import { ListarCategoriaViewModel } from "./listar/models/categoria-models";
import { inject } from "@angular/core";
import { CategoriaService } from "./service/categoria.service";

export const listagemCategoriasResolver: ResolveFn<ListarCategoriaViewModel[]> = () => {
  return inject(CategoriaService).selecionarTodos();
}

export const categoriasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemCategoriasComponent,
    resolve: { categorias: listagemCategoriasResolver }
  },
]

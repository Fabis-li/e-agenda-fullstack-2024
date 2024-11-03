import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { ListagemCategoriasComponent } from './listar/listagem-categorias.component';
import {
  ListarCategoriaViewModel,
  VisualizarCategoriaViewModel,
} from './models/categoria-models';
import { inject } from '@angular/core';
import { CategoriaService } from './service/categoria.service';
import { CadastroCategoriaComponent } from './cadastro/cadastro-categoria.component';
import { EdicaoCategoriaComponent } from './editar/edicao-categoria.component';

export const listagemCategoriasResolver: ResolveFn<
  ListarCategoriaViewModel[]
> = () => {
  return inject(CategoriaService).selecionarTodos();
};

export const visualizarCategoriaResover: ResolveFn<
  VisualizarCategoriaViewModel
> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  return inject(CategoriaService).selecionarPorId(id);
};

export const categoriasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemCategoriasComponent,
    resolve: { categorias: listagemCategoriasResolver },
  },
  {
    path: 'cadastrar',
    component: CadastroCategoriaComponent,
  },
  {
    path: 'editar/:id',
    component: EdicaoCategoriaComponent,
    resolve: { categoria: visualizarCategoriaResover },
  }
];

import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { ListagemDespesasComponent } from './listar/listagem-despesas.component';
import {
  ListarDespesaViewModel,
  VisualizarDespesaViewModel,
} from './models/despesa.models';
import { inject } from '@angular/core';
import { DespesaService } from './service/despesa.service';
import { CadastroDespesaComponent } from './cadastro/cadastro-despesa.component';
import { listagemCategoriasResolver } from '../categorias/categorias.routes';
import { EdicaoDespesaComponent } from './editar/edicao-despesa.component';

export const listagemDespesasResolver: ResolveFn<
  ListarDespesaViewModel[]
> = () => {
  return inject(DespesaService).selecionarTodos();
};

export const visualizarDespesaResolver: ResolveFn<
  VisualizarDespesaViewModel
> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];

  return inject(DespesaService).selecionarPorId(id);
};

export const despesasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemDespesasComponent,
    resolve: { despesas: listagemDespesasResolver },
  },
  {
    path: 'cadastrar',
    component: CadastroDespesaComponent,
    resolve: { categorias: listagemCategoriasResolver },
  },
  {
    path: 'editar/:id',
    component: EdicaoDespesaComponent,
    resolve: { despesa: visualizarDespesaResolver, categorias: listagemCategoriasResolver },
  },
];

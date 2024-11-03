import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CategoriaEditadaViewModel, CategoriaExcluidaViewModel, CategoriaInseridaViewModel, EditarCategoriaViewModel, InserirCategoriaViewModel, ListarCategoriaViewModel } from '../models/categoria-models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly url: string = `${environment.apiUrl}/categorias`;

  constructor(private http:HttpClient) { }

  public inserir(inserirCategoria: InserirCategoriaViewModel){
    return this.http
      .post<CategoriaInseridaViewModel>(this.url,inserirCategoria)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(id: string, editarCategoria: EditarCategoriaViewModel): Observable<CategoriaEditadaViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .put<CategoriaEditadaViewModel>(urlCompleto, editarCategoria)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<CategoriaExcluidaViewModel>{
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .delete<CategoriaExcluidaViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarTodos(): Observable<ListarCategoriaViewModel[]> {
    return this.http
      .get(this.url)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarPorId(id: string) {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;

    return this.http
      .get(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  private processarDados(resposta: any) {
    if(resposta.sucesso) return resposta.dados;

    throw new Error('Erro ao mapear dados requisitados');
  }

  private processarFalha(resposta: any) {
    return throwError(() => Error(resposta.error.erros[0]));
  }
}

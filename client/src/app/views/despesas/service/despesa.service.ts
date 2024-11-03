import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  DespesaEditadaViewModel,
  DespesaExcluidaViewModel,
  DespesaInseridaViewModel,
  EditarDespesaViewModel,
  InserirDespesaViewModel,
  ListarDespesaViewModel,
  VisualizarDespesaViewModel,
} from '../models/despesa.models';

@Injectable({
  providedIn: 'root',
})
export class DespesaService {
  private readonly url = `${environment.apiUrl}/despesas`;

  constructor(private http: HttpClient) {}

  public inserir(
    inserirDespesa: InserirDespesaViewModel
  ): Observable<DespesaInseridaViewModel> {
    return this.http
      .post(this.url, inserirDespesa)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(
    id: string,
    editarDespesa: EditarDespesaViewModel
  ): Observable<DespesaEditadaViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .put<DespesaEditadaViewModel>(urlCompleto, editarDespesa)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<DespesaExcluidaViewModel>{
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .delete<DespesaExcluidaViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarTodos(): Observable<ListarDespesaViewModel[]> {
    return this.http
      .get<ListarDespesaViewModel[]>(this.url)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarPorId(id: string): Observable<VisualizarDespesaViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;

    return this.http
      .get<VisualizarDespesaViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  private processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;

    throw new Error('Erro ao mapear dados requisitados');
  }

  private processarFalha(resposta: any) {
    return throwError(() => Error(resposta.error.erros[0]));
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { EditarTarefaViewModel, InserirTarefaViewModel, ListarTarefasViewsModel, TarefaEditadaViewModel, TarefaExcluidaViewModel, TarefaInseridaViewModel, VisualizarTarefaviewModel } from '../models/tarefa.models';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private readonly url: string = `${environment.apiUrl}/tarefas`;

  constructor(private http: HttpClient) { }

  public inserir(inserirTarefa: InserirTarefaViewModel): Observable<TarefaInseridaViewModel> {
    return this.http
      .post<TarefaInseridaViewModel>(this.url, inserirTarefa)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(id:string, editarTarefa: EditarTarefaViewModel): Observable<TarefaEditadaViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .put<TarefaEditadaViewModel>(urlCompleto, editarTarefa)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<TarefaExcluidaViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .delete<TarefaExcluidaViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarTodos(): Observable<ListarTarefasViewsModel[]> {
    return this.http
      .get(this.url)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarPorId(id: string): Observable<VisualizarTarefaviewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;

    return this.http
      .get<VisualizarTarefaviewModel>(urlCompleto)
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

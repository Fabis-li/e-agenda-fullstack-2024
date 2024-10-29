import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ListarTarefasViewsModel } from '../models/tarefa.models';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private readonly url: string = `${environment.apiUrl}/tarefas`;

  constructor(private http: HttpClient) { }

  public selecionarTodos(): Observable<ListarTarefasViewsModel[]> {
    return this.http
      .get(this.url)
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

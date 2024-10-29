import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../../core/auth/services/local-storage.service';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { ContatoEditadoViewModel, ContatoExcluidoViewModel, ContatoInseridoViewModel, EditarContatoViewModel, InserirContatoViewModel, ListarContatoViewModel, VisualizarContatoViewModel } from '../models/contato.models';


@Injectable({
  providedIn: 'root'
})
export class ContatoService {


  private readonly url = `${environment.apiUrl}/contatos`;

  constructor(
    private http: HttpClient
  ) { }

  public inserir(inserirContato: InserirContatoViewModel): Observable<ContatoInseridoViewModel>{
    return this.http
      .post<ContatoInseridoViewModel>(this.url, inserirContato)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(id: string, editarContato: EditarContatoViewModel): Observable<ContatoEditadoViewModel>{
    const urlCompleto = `${this.url}/${id}`

    return this.http
      .put<ContatoEditadoViewModel>(urlCompleto, editarContato)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<ContatoExcluidoViewModel> {
    const urlCompleto = `${this.url}/${id}`

    return this.http.delete<ContatoExcluidoViewModel>(urlCompleto)
      .pipe(map(this.processarDados),
      catchError(this.processarFalha)
    );
  }

  public selecionarTodos(): Observable<ListarContatoViewModel[]> {
    return this.http.get<ListarContatoViewModel[]>(this.url)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarPorId(id: string): Observable<VisualizarContatoViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;

    return this.http.get<VisualizarContatoViewModel>(urlCompleto)
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

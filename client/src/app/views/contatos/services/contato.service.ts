import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../../core/auth/services/local-storage.service';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { ContatoInseridoViewModel, InserirContatoViewModel, ListarContatoViewModel } from '../models/contato.models';


@Injectable({
  providedIn: 'root'
})
export class ContatoService {


  private readonly url = `${environment.apiUrl}/contatos`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  public inserir(inserirContato: InserirContatoViewModel): Observable<ContatoInseridoViewModel>{
    return this.http
      .post<ContatoInseridoViewModel>(this.url, inserirContato)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarTodos(): Observable<ListarContatoViewModel[]> {
    return this.http.get<ListarContatoViewModel[]>(this.url)
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

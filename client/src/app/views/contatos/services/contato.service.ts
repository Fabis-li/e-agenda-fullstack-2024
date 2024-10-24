import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../../core/auth/services/local-storage.service';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { ListarContatoViewModel } from '../models/contato.models';


@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private readonly url = `${environment.apiUrl}/contatos`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  public selecionarTodos(): Observable<ListarContatoViewModel[]> {
    return this.http.get<ListarContatoViewModel[]>(this.url, this.obterHeadersAutorizacao())
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  private processarDados(resposta: any) {
    if(resposta.sucesso) return resposta.dados;

    throw new Error('Erro ao mapear dados requisitados');
  }

  private processarFalha(resposta: any) {
    return throwError(() => Error(resposta.error.erros[0]));
  }

  private obterHeadersAutorizacao() {
    const chave = this.localStorageService.obterTokenAutenticacao()?.chave;

    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chave}`,
      }
    }
  }
}

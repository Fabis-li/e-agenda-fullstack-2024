import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ListarCompromissoViewModel } from '../models/compromisso.models';

@Injectable({
  providedIn: 'root'
})
export class CompromissoService {
  private readonly url = `${environment.apiUrl}/compromissos`;

  constructor(private http: HttpClient) { }

  public selecionarTodos(): Observable<ListarCompromissoViewModel[]> {
    return this.http
    .get<ListarCompromissoViewModel[]>(this.url)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  private processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;

    throw new Error('Erro ao mapear dados requisitados.');
  }

  private processarFalha(resposta: any) {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CompromissoInseridoViewModel, InserirCompromissoViewModel, ListarCompromissoViewModel } from '../models/compromisso.models';
import { LocalStorageService } from '../../../core/auth/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CompromissoService {
  private readonly url = `${environment.apiUrl}/compromissos`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  public inserir(
    inserirCompromisso: InserirCompromissoViewModel
  ): Observable<CompromissoInseridoViewModel> {
    return this.http
      .post<CompromissoInseridoViewModel>(this.url, inserirCompromisso)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

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

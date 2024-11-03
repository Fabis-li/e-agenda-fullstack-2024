import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CategoriaInseridaViewModel, InserirCategoriaViewModel, ListarCategoriaViewModel } from '../listar/models/categoria-models';

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

import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly url = `${environment.apiUrl}/categorias`;

  constructor(private http:HttpClient) { }

  public selecionarTodos() {
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

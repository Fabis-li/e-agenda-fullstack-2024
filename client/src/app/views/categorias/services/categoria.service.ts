import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CadastrarCategoria, Categoriacriada, ListagemCategoria } from "../models/categoria.models";


@Injectable()
export class CategoriaService {
  private readonly url = `${environment.apiUrl}/categorias`;

    constructor(private http: HttpClient) { }

    cadastrar(novaCategoria: CadastrarCategoria): Observable<Categoriacriada> {
      return this.http.post<Categoriacriada>(this.url, novaCategoria);
    }

    selecionarTodos():Observable<ListagemCategoria[]> {
      return this.http.get<ListagemCategoria[]>(this.url);
    }



}

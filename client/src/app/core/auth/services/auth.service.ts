import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { AutenticarUsuarioViewModel, RegistrarUsuarioViewModel, TokenViewModel } from "../models/auth.models";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable()
export class AuthService {


  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public registrar(registro: RegistrarUsuarioViewModel): Observable<TokenViewModel> {
    const urlCompleto = `${this.apiUrl}/contas/registrar`;

    return this.http
      .post<TokenViewModel>(urlCompleto, registro)
      .pipe(map(this.processarDados));
  }

  public login(loginUsuario: AutenticarUsuarioViewModel) {
    const urlCompleto = `${this.apiUrl}/contas/autenticar`;

    return this.http.post<TokenViewModel>(urlCompleto, loginUsuario).pipe(
      map(this.processarDados),
      catchError(this.processarFalha)
    );
  }

  public logout() {
    const urlCompleto = `${this.apiUrl}/contas/sair`;

    return this.http
      .post<TokenViewModel>(urlCompleto, {})

  }


  public validarExpiracaoToken(dataExpiracao: Date): boolean {
    return dataExpiracao > new Date(); // Verificando se a data de expiração é maior que a data atual
  }

  private processarDados(resposta: any): TokenViewModel {
    if(resposta.sucesso) return resposta.dados;

    throw new Error('Erro ao mapear token do usuário.');
  }

  private processarFalha(resposta: any) {
    console.log(resposta)
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ShellComponent } from "./core/shell/shell.component";
import { Observable } from 'rxjs';
import { UsuarioTokenViewModel } from './core/auth/models/auth.models';
import { UsuarioService } from './core/auth/services/usuario.service';
import { NotificacaoService } from './core/notificacao/notificacao.service';
import { AsyncPipe } from '@angular/common';
import { LocalStorageService } from './core/auth/services/local-storage.service';
import { AuthService } from './core/auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShellComponent, AsyncPipe],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  usuarioAutenticado$?: Observable<UsuarioTokenViewModel | undefined>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private notificacaoService: NotificacaoService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.usuarioAutenticado$ = this.usuarioService.usuarioAutenticado;// Obtendo o usuário autenticado

    const token = this.localStorageService.obterTokenAutenticacao();// Obtendo o token de autenticação do local storage

    if(!token) return;// Se não houver token, retornar

    const usuarioPersistido = token.usuario; // Obtendo o usuário persistido no token
    const dataExpiracao = new Date(token.dataExpiracao);// Obtendo a data de expiração do token

    const tokenValido:boolean = this.authService.validarExpiracaoToken(dataExpiracao);// Validando a expiração do token

    if(usuarioPersistido && tokenValido) {
       this.usuarioService.logarUsuario(usuarioPersistido);// Se o token for válido, logar o usuário
    } else {
      this.efetuarLogout();// Se o token não for válido, efetuar o logout
    }
  }

  efetuarLogout() {
    this.usuarioService.logout();// Chamando o método de logout do serviço de usuário
    this.authService.logout();// Chamando o método de logout do serviço de autenticação
    this.localStorageService.limparDadosLocais();// Chamando o método de limpar dados locais do serviço de local storage

    this.notificacaoService.sucesso('Logout efetuado com sucesso!');

    this.router.navigate(['/login']);// Navegando para a tela de login
  }

}

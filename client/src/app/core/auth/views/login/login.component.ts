import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AutenticarUsuarioViewModel, UsuarioTokenViewModel } from '../../models/auth.models';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService,
    ) {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],// Criando o campo login do formulário
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],// Criando o campo senha do formulário
    });// Criando o formulário
  }

  get login() {
    return this.form.get('login');// Obtendo o campo login do formulário
  }

  get senha() {
    return this.form.get('senha');// Obtendo o campo senha do formulário
  }

  public entrar() {
    if (!this.form.valid) return;// Se o formulário não for válido, retornar

    const loginUsuario: AutenticarUsuarioViewModel = this.form.value;// Obtendo os valores do formulário

    this.authService.login(loginUsuario).subscribe((res) =>  {
      this.usuarioService.logarUsuario(res.usuario);// Logando o usuário
      this.localStorageService.salvarTokenAutenticacao(res);// Salvando o token no local storage

      this.router.navigate(['/dashboard']);// Redirecionando para a dashboard
    })// Realizando o login do usuário
  }
}

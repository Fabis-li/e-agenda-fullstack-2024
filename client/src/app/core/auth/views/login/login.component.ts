import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioTokenViewModel } from '../../models/auth.models';

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
    private usuarioSerivce: UsuarioService
    ) {
    this.form = this.fb.group({
      login: ['', Validators.required, Validators.minLength(3), Validators.maxLength(30)],
      senha: ['', Validators.required, Validators.minLength(6), Validators.maxLength(30)],
    });
  }

  get login() {
    return this.form.get('login');
  }

  get senha() {
    return this.form.get('senha');
  }

  public entrar() {
    if (this.form.valid) return;

    const usuarioLogado:UsuarioTokenViewModel = this.form.value;
    console.log(usuarioLogado)

    this.usuarioSerivce.logarUsuario(usuarioLogado);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegistrarUsuarioViewModel } from '../../models/auth.models';
import { UsuarioService } from '../../services/usuario.service';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './registro.component.html',
})
export class RegistroComponent {
   form: FormGroup;

   constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
   };

   get nome() {
    return this.form.get('nome');
  }
  get login() {
    return this.form.get('login');
  }
  get email() {
    return this.form.get('email');
  }
  get senha() {
    return this.form.get('senha');
  }

   public registrar() {
    if(this.form.invalid) return;

    const registro: RegistrarUsuarioViewModel = this.form.value;

    this.authService.registrar(registro).subscribe((res) => {
      this.usuarioService.logarUsuario(res.usuario);

      this.router.navigate(['/dashboard']);
    })
   }
}

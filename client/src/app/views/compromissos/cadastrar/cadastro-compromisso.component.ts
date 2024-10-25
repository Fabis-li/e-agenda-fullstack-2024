import { NgIf, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';

@Component({
  selector: 'app-cadastro-compromisso',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './cadastro-compromisso.component.html'
})
export class CadastroCompromissoComponent {
  public form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private notification: NotificacaoService
  ) {
    this.form = this.fb.group({
      assunto: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      data: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])(\/|-)([0-9]{4})$/),
        ]
      ],
      horarioInicio: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
        ]
      ],
      horarioTermino: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
        ]
      ],
      local: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      link: [
      '',
      [
        Validators.required,
        Validators.pattern(/(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/),
        Validators.maxLength(50)
      ]
    ],
      contato: [
        '',
        [
          Validators.required,
        ]
      ]
    })
  }

  get assunto() {
    return this.form.get('assunto');
  }

  get data() {
    return this.form.get('data');
  }

  get horarioInicio() {
    return this.form.get('horarioInicio');
  }

  get horarioTermino() {
    return this.form.get('horarioTermino');
  }

  get local() {
    return this.form.get('local');
  }

  get link() {
    return this.form.get('link');
  }

  get contato() {
    return this.form.get('contato');
  }

  private processarSucesso(contato: ContatoInseridoViewModel): void {
    this.notification.sucesso(
      `Contato "${contato.nome}" cadastrado com sucesso!`
    );
    this.router.navigate(['/contatos', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notification.erro(erro.message);
  }
}

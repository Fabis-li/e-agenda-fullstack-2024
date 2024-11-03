import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { CategoriaService } from '../service/categoria.service';
import { CategoriaInseridaViewModel, InserirCategoriaViewModel } from '../listar/models/categoria-models';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cadastro-categoria',
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
  templateUrl: './cadastro-categoria.component.html'
})
export class CadastroCategoriaComponent {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoriaService: CategoriaService,
    private notificacao: NotificacaoService,
  ) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
  }

  get titulo() {
    return this.form.get('titulo');
  }

  public gravar() {
    if(this.form.invalid){
      this.notificacao.aviso(
        'Por favor, preencha o formulário corretamente!'
      );

      return;
    }

    const inserirCategoria: InserirCategoriaViewModel = this.form.value;

    this.categoriaService.inserir(inserirCategoria).subscribe({
      next:(categoriaInserida) => this.processarSucesso(categoriaInserida),
      error:(erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(categoria: CategoriaInseridaViewModel): void {
    this.notificacao.sucesso(
      `Categoria "${categoria.titulo}" cadastrada com sucesso!`
    );
    this.router.navigate(['/categorias', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }

}

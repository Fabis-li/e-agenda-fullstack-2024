import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { InserirCategoriaViewModel, CategoriaInseridaViewModel, EditarCategoriaViewModel } from '../models/categoria-models';
import { CategoriaService } from '../service/categoria.service';
import { NgIf, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edicao-categoria',
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
  templateUrl: './edicao-categoria.component.html'
})
export class EdicaoCategoriaComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private notificacao: NotificacaoService,
  ) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
  }

  ngOnInit(): void {
    const categoria = this.route.snapshot.data['categoria'];

    this.form.patchValue(categoria);
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

    const id = this.route.snapshot.params['id'];
    const editarCategoria: EditarCategoriaViewModel = this.form.value;

    this.categoriaService.editar(id, editarCategoria).subscribe({
      next:(categoriaEditada) => this.processarSucesso(categoriaEditada),
      error:(erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(categoria: CategoriaInseridaViewModel): void {
    this.notificacao.sucesso(
      `Categoria "${categoria.titulo}" editada com sucesso!`
    );
    this.router.navigate(['/categorias', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }



}

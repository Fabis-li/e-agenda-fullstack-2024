import { NgIf, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ListarCategoriaViewModel } from '../../categorias/models/categoria-models';
import { FormaPgtoDespesaEnum, InserirDespesaViewModel, DespesaInseridaViewModel, EditarDespesaViewModel } from '../models/despesa.models';
import { DespesaService } from '../service/despesa.service';

@Component({
  selector: 'app-edicao-despesa',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './edicao-despesa.component.html'
})
export class EdicaoDespesaComponent {
  public form: FormGroup;
  public categorias: ListarCategoriaViewModel[] = [];

  public opcoesFormaPagamento = Object.values(FormaPgtoDespesaEnum).filter(
    (v) => !Number.isFinite(v)
  );

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private despesaService: DespesaService,
    private notificacao: NotificacaoService,
  ) {
    this.form = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      data: [new Date().toISOString().substring(0,10),[Validators.required]],
      formaPagamento: ['', [Validators.required]],
      categoriasSelecionadas: [[], [Validators.required]],
    });
  }

  get descricao() {
    return this.form.get('descricao');
  }

  get valor() {
    return this.form.get('valor');
  }

  get data() {
    return this.form.get('data');
  }

  get formaPagamento() {
    return this.form.get('formaPagamento');
  }

  get categoriasSelecionadas() {
    return this.form.get('categoriaSelecionada') as FormArray;
  }

  ngOnInit(): void {
    this.categorias = this.route.snapshot.data['categorias'];

    console.log(this.categorias)

    const despesa = this.route.snapshot.data['despesa'];
    console.log(despesa);

    this.form.patchValue({
      ...despesa,
      data: new Date(despesa.data).toISOString().substring(0,10),
      categoriasSelecionadas: despesa.categorias.map((c: ListarCategoriaViewModel) => c.id),
    });
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacao.erro('Formulário inválido');
      return;
    };

    const id = this.route.snapshot.params['id'];
    const editarDespesa: EditarDespesaViewModel = this.form.value;
    console.log(editarDespesa);

    this.despesaService.editar(id, editarDespesa).subscribe({
      next: (despesa) => this.processarSucesso(despesa),
      error: (erro) => this.processarFalha(erro),
    });
  };


  private processarSucesso(despesa: DespesaInseridaViewModel): void {
    this.notificacao.sucesso(
      `Despesa "${despesa.descricao}" editada com sucesso!`
    );
    this.router.navigate(['/despesas', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import {
  PrioridadeTarefaEnum,
  EditarTarefaViewModel,
  TarefaEditadaViewModel,
  ItemTarefaViewModel,
} from '../models/tarefa.models';
import { TarefaService } from '../service/tarefa.service';
import { NgIf, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-edicao-tarefa',
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
    MatSelectModule,
    MatDividerModule,
    MatCardModule,
    MatTooltipModule,
  ],
  templateUrl: './edicao-tarefa.component.html',
})
export class EdicaoTarefaComponent implements OnInit {
  public form: FormGroup;

  public prioridades = Object.values(PrioridadeTarefaEnum).filter(
    (v) => !Number.isFinite(v)
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tarefaService: TarefaService,
    private notificacao: NotificacaoService
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      prioridade: ['', Validators.required],
      itens: this.fb.array([]),
    });
  }

  get titulo() {
    return this.form.get('titulo');
  }

  get prioridade() {
    return this.form.get('prioridade');
  }

  get itens() {
    return this.form.get('itens') as FormArray;
  }

  get itensParaExibir() {
    return this.itens.controls.filter((item) => item.value.status !== 2);
  }

  ngOnInit(): void {
    const tarefas = this.route.snapshot.data['tarefas'];

    this.form.patchValue(tarefas);

    for(let item of tarefas.itens) {
      const controle = new FormControl({
        id: item.id,
        titulo: item.titulo,
        status: item.status,
        concluido: item.concluido,
      });

      this.itens.push(controle);
    }
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacao.aviso('Por favor, preencha o formulário corretamente.');
      return;
    }
    const id = this.route.snapshot.params['id'];
    const editarTarefa: EditarTarefaViewModel = this.form.value;

    this.tarefaService.editar(id, editarTarefa).subscribe({
      next: (tarefaEditada) => this.processarSucesso(tarefaEditada),
      error: (erro) => this.processarFalha(erro),
    });

    console.log(editarTarefa);
  }

  public adicionarItem(itemTitulo: string) {
    const control = new FormControl({
      titulo: itemTitulo,
      status: 1,
      concluido: false,
    });

    this.itens.push(control);

  }

  public removerItem(indice: number) {

    const itemSelecionado: ItemTarefaViewModel = this.itens.at(indice).value;

    const objetoEditado = {
      ...itemSelecionado,
      status: 2,
    };

    this.itens.at(indice).patchValue(objetoEditado);

     this.notificacao.aviso('Item removido com sucesso!');
  }

  public alterarStatusItem(indice: number) {
    const itemSelecionado:ItemTarefaViewModel = this.itens.at(indice).value;

    const itemSelecionadoEstaConcluido = itemSelecionado.concluido;

    const  objetoEditado = {
      ...itemSelecionado,
      concluido: !itemSelecionadoEstaConcluido,
    };

    this.itens.at(indice).patchValue(objetoEditado);

    if(itemSelecionadoEstaConcluido){
      this.notificacao.aviso('Conclusão do item marcada para ser cancelada.');

      return;
    }

    this.notificacao.aviso('Item marcado para conclusão!');
  }

  private processarSucesso(tarefa: TarefaEditadaViewModel): void {
    this.notificacao.sucesso(`Tarefa "${tarefa.titulo}" a com sucesso!`);
    this.router.navigate(['/tarefas', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}

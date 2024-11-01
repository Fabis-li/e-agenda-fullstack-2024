import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { TarefaService } from '../service/tarefa.service';
import { InserirTarefaViewModel, PrioridadeTarefaEnum, TarefaInseridaViewModel } from '../models/tarefa.models';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cadastro-tarefa',
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
  templateUrl: './cadastro-tarefa.component.html',
})
export class CadastroTarefaComponent {
  public form: FormGroup;

  public prioridades = Object.values(PrioridadeTarefaEnum).filter((v) => !Number.isFinite(v));

  public novoItemTitulo: FormControl = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tarefaService: TarefaService,
    private notification: NotificacaoService,
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      prioridade: ['', Validators.required],
      itens: this.fb.array([]),
    });
  }

  get titulo(){
    return this.form.get('titulo');
  }

  get prioridade() {
    return this.form.get('prioridade');
  }

  get itens() {
    return this.form.get('itens') as FormArray;
  }

  public gravar() {
    if (this.form.invalid) {
      this.notification.aviso('Por favor, preencha o formulário corretamente.');
      return;
    }
    const inserirTarefa: InserirTarefaViewModel = this.form.value;

    this.tarefaService.inserir(inserirTarefa).subscribe({
      next: (tarefaInserida) => this.processarSucesso(tarefaInserida),
      error: (erro) => this.processarFalha(erro),
    });
  }

  public adicionarItem() {
    const titulo = this.novoItemTitulo.value;
    if(titulo) {
      this.itens.push(
        this.fb.group({
          titulo: titulo,
          status: 1,
          concluido: false,
        })
      );
      this.novoItemTitulo.reset();
    }
  }

  public removerItem(index: number) {
    this.itens.removeAt(index);

    this.notification.aviso('Item removido com sucesso!');
  }

  private processarSucesso(tarefa: TarefaInseridaViewModel): void {
    this.notification.sucesso(
      `Tarefa "${tarefa.titulo}" a com sucesso!`
    );
    this.router.navigate(['/tarefas', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notification.erro(erro.message);
  }
}

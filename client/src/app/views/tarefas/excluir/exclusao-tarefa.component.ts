import { Component, OnInit } from '@angular/core';
import {  PrioridadeTarefaEnum, VisualizarTarefaviewModel } from '../models/tarefa.models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TarefaService } from '../service/tarefa.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-exclusao-tarefa',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './exclusao-tarefa.component.html',
})
export class ExclusaoTarefaComponent implements OnInit {
  detalhesTarefa?: VisualizarTarefaviewModel;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tarefaService: TarefaService,
    private notificacaoService: NotificacaoService
  ) {}

  ngOnInit(): void {
    this.detalhesTarefa = this.route.snapshot.data['tarefas'];
  }

  public obterTextoPrioridade(prioridade: PrioridadeTarefaEnum): string {
    return PrioridadeTarefaEnum[prioridade];
  }

  public excluir() {
    this.tarefaService.excluir(this.detalhesTarefa!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso('Tarefa excluída com sucesso!');

    this.router.navigate(['/tarefas', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}

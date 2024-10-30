import { Component, OnInit } from '@angular/core';
import { ListarTarefasViewsModel } from '../models/tarefa.models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf, NgForOf, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-listagem-tarefa',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    //DatePipe
  ],
  templateUrl: './listagem-tarefa.component.html'
})
export class ListagemTarefaComponent implements OnInit {
  tarefas: ListarTarefasViewsModel[] = [];

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.tarefas = this.route.snapshot.data['tarefas'];
  }


}

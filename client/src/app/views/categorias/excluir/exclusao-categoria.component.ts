import { Component, OnInit } from '@angular/core';
import { VisualizarCategoriaViewModel } from '../models/categoria-models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { CategoriaService } from '../service/categoria.service';
import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-exclusao-categoria',
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
  templateUrl: './exclusao-categoria.component.html'

})
export class ExclusaoCategoriaComponent implements OnInit {

  detalhesCategoria?: VisualizarCategoriaViewModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private notificacao: NotificacaoService,
  ) { }

  ngOnInit(): void {
    this.detalhesCategoria = this.route.snapshot.data['categoria'];
  }

  public excluir() {
    this.categoriaService.excluir(this.detalhesCategoria!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    })
  }

  private processarSucesso(): void {
    this.notificacao.sucesso('Tarefa excluída com sucesso!');

    this.router.navigate(['/categorias', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }

}

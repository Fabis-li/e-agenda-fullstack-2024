import { Component, OnInit } from '@angular/core';
import { FormaPgtoDespesaEnum, VisualizarDespesaViewModel } from '../models/despesa.models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { DespesaService } from '../service/despesa.service';
import { NgIf, NgForOf, AsyncPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-exclusao-despesa',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    DatePipe,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './exclusao-despesa.component.html'
})
export class ExclusaoDespesaComponent implements OnInit {
  public detalhesDespesa?: VisualizarDespesaViewModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private despesaService: DespesaService,
    private notificacaoService: NotificacaoService,
  ) {}


  ngOnInit(): void {
    this.detalhesDespesa = this.route.snapshot.data['despesa'];
  }

  public obterTextoFormaPagamento(formaPagamento: FormaPgtoDespesaEnum): string {
    const indice = Number(formaPagamento);

    return FormaPgtoDespesaEnum[indice];
  }

  public excluir() {
    this.despesaService.excluir(this.detalhesDespesa!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro: Error) => this.processarFalha(erro),
    });
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso('Despesa excluída com sucesso!');

    this.router.navigate(['/despesas', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}

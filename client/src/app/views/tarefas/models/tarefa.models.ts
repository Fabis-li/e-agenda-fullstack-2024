export enum PrioridadeTarefaEnum {
  Baixa,
  Normal,
  Alta
}

export enum StatusTarefaEnum {
  Todos,
  Pendentes,
  Concluidas
}

export enum StatusItemTarefaEnum {
  Nenhum,
  Adicionado,
  Removido
}

export interface ListarTarefasViewsModel {
  id: string;
  titulo: string;
  dataCriacao: Date;
  prioridade: string;
  situacao: string;
}

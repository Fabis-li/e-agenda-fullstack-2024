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

export interface ItemTarefaViewModel {
  id: string;
  titulo: string;
  status: StatusItemTarefaEnum;
  concluido: boolean;
}

export interface InserirTarefaViewModel {
  titulo: string;
  prioridade: PrioridadeTarefaEnum;
  itens: ItemTarefaViewModel;
}

export interface TarefaInseridaViewModel {
  id: string;
  titulo: string;
  prioridade: PrioridadeTarefaEnum;
  itens: ItemTarefaViewModel;
}

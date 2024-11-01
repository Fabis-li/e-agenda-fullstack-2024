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

export interface EditarTarefaViewModel {
  titulo: string;
  prioridade: PrioridadeTarefaEnum;
  itens: ItemTarefaViewModel[];
}

export interface TarefaEditadaViewModel {
  titulo: string;
  prioridade: PrioridadeTarefaEnum;
  itens: ItemTarefaViewModel[];
}

export interface TarefaExcluidaViewModel {}

export interface ListarTarefasViewsModel {
  id: string;
  titulo: string;
  dataCriacao: Date;
  prioridade: string;
  situacao: string;
}

export interface VisualizarTarefaviewModel {
  id: string;
  titulo: string;
  dataCriacao: Date;
  dataConclusao: Date;
  quantidadeItens: number;
  percentualConcluido: number;
  prioridade: PrioridadeTarefaEnum;
  situacao: string;
  itens: ItemTarefaViewModel[];
}


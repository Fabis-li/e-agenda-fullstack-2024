export enum FormaPgtoDespesaEnum {
  PIX,
  Dinheiro,
  CartaoCredito = 'Cartão de Crédito',
}

export interface InserirDespesaViewModel {
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: FormaPgtoDespesaEnum;
  categoriasSelecionadas: string[];
}

export interface DespesaInseridaViewModel {
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: FormaPgtoDespesaEnum;
  categoriasSelecionadas: string[];
}

export interface EditarDespesaViewModel {
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: FormaPgtoDespesaEnum;
  categoriasSelecionadas: string[];
}

export interface DespesaEditadaViewModel {
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: FormaPgtoDespesaEnum;
  categoriasSelecionadas: string[];
}

export interface ListarDespesaViewModel {
  id: string;
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: string;
}

export interface VisualizarDespesaViewModel {
  id: string;
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: FormaPgtoDespesaEnum;
  categorias: string[];
}



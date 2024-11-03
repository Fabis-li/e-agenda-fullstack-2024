export enum FormaPgtoDespesaEnum {
  Pix,
  Dinheiro,
  CartaoCredito = 'Cartão de Crédito',
}

export interface ListarDespesaViewModel {
  id: string;
  descricao: string;
  valor: number;
  date: Date;
  formaPagamento: string;
}

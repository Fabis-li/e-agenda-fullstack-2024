import { ListarContatoViewModel } from "../../contatos/models/contato.models";

export interface ListarCompromissoViewModel {
  id: string;
  assunto: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  local: string;
  link: string;
  contato: ListarContatoViewModel;
}

export enum TipoLocalizacaoCompromissoEnum {
  Remoto,
  Presencial
}

export interface InserirCompromissoViewModel {
  assunto: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  tipoLocal:TipoLocalizacaoCompromissoEnum;
  local?: string;
  link?: string;
  contatoId?: string;
}

export interface CompromissoInseridoViewModel {
  id: string;
  assunto: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  tipoLocal:TipoLocalizacaoCompromissoEnum;
  local?: string;
  link?: string;
  contatoId?: string;
}
export interface EditarCompromissoViewModel {
  assunto: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  tipoLocal:TipoLocalizacaoCompromissoEnum;
  local?: string;
  link?: string;
  contatoId?: string;
}

export interface CompromissoEditadoViewModel {
  assunto: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  tipoLocal:TipoLocalizacaoCompromissoEnum;
  local?: string;
  link?: string;
  contatoId?: string;
}
export interface CompromissoExcluidoViewModel {}

export interface VisualizarCompromissoViewModel {
  id: string;
  assunto: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  tipoLocal:TipoLocalizacaoCompromissoEnum;
  local?: string;
  link?: string;
  contato: ListarContatoViewModel;
}

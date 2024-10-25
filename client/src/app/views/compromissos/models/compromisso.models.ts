import { ListarContatoViewModel } from "../../contatos/models/contato.models";

export interface ListarCompromissoViewModel {
  id: string;
  assunto: string;
  data: string;
  horarioInicio: string;
  horarioTermino: string;
  local: string;
  link: string;
  contato: ListarContatoViewModel;
}

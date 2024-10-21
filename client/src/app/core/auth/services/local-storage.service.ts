import { Token } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { TokenViewModel } from "../models/auth.models";

@Injectable()
export class LocalStorageService {
  private readonly chave: string = 'eAgenda.token';

  public salvarTokenAutenticacao(token: TokenViewModel): void {
    const jsonString = JSON.stringify(token);// Convertendo o objeto para string

    localStorage.setItem(this.chave, jsonString);// Salvando o token no local storage
  }// Método para salvar o token de autenticação no local storage

  public obterTokenAutenticacao(): TokenViewModel | undefined {
    const jsonString = localStorage.getItem(this.chave);// Obtendo o token do local storage

    if(!jsonString) return undefined;// Se não houver token, retornar indefinido

    return JSON.parse(jsonString);// Convertendo a string para objeto
  }

  public limparDadosLocais(): void {
    localStorage.removeItem(this.chave);// Removendo o token do local storage
  }
}

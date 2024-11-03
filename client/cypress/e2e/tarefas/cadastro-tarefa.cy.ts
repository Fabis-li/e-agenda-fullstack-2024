
import { TarefasPageObject } from './util/tarefas.page-object';

describe('Ao navegar para o Cadastro de Tarefas', () => {
  const tarefasPageObject = new TarefasPageObject();

  beforeEach(() => {
    cy.limparDados();

    cy.registrar();

    cy.wait(2000);

    cy.url().should('contain', 'dashboard');

    cy.visit('/tarefas');

    cy.wait(2000);

    cy.contains('h1', 'Listagem de Tarefas');
  });

  it('Deve cadastrar a tarefa corretamente', () => {
    cy.get('[data-cy-list-item]').should('have.length', 0);

    tarefasPageObject.inserirTarefa();

    cy.get('[data-cy-list-item]').should('have.length', 1);
  });

  it('Deve exibir erro ao tentar cadastrar sem preencher o título', () => {
    cy.get('[data-cy=cadastrarNovo]').click();

    tarefasPageObject.titulo.focus().blur();

    cy.get('mat-error').contains('O título preciso ser preenchido.');
  });
});

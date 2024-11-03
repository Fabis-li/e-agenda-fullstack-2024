import { TarefasPageObject } from './util/tarefas.page-object';

describe('Ao navegar para a Edição de Tarefa', () => {
  const tarefasPageObject = new TarefasPageObject();

  beforeEach(() => {
    cy.limparDados();

    cy.registrar();

    cy.wait(2000);

    cy.url().should('contain', 'dashboard');

    cy.visit('/tarefas');

    cy.contains('h1', 'Listagem de Tarefas');

    tarefasPageObject.inserirTarefa();
  });

  it('Deve editar a tarefa corretamente', () => {
    cy.get('[data-cy-list-item]').should('have.length', 1);

    tarefasPageObject.editarTarefa({
      novoTitulo: 'Nova Tarefa Editada',
      novaPrioridadeIndex: 1,
    });

    cy.wait(2000);

    cy.get('[data-cy-list-item]')
      .first()
      .should('contain', 'Nova Tarefa Editada');
  });

  it('Deve exibir erro ao tentar editar sem preencher o título', () => {
    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy="botaoEditar"]').click();
      });

    tarefasPageObject.titulo.focus().clear().blur();

    cy.get('mat-error').should('contain', 'O título precisa ser preenchido.');
  });
});

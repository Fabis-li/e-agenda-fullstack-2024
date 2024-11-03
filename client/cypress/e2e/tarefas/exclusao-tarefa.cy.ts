import { TarefasPageObject } from './util/tarefas.page-object';

describe('Ao navegar para a Exclusão de Tarefa', () => {
  const tarefasPageObject = new TarefasPageObject();

  beforeEach(() => {
    cy.limparDados();

    cy.registrar();

    cy.wait(2000);

    cy.url().should('contain', 'dashboard');

    cy.visit('/tarefas');

    cy.wait(2000);

    cy.contains('h1', 'Listagem de Tarefas');

    tarefasPageObject.inserirTarefa();
  });

  it('Deve exibir os detalhes corretos da tarefa a ser excluída', () => {
    tarefasPageObject.selecionarTarefaParaExclusao();

    cy.contains('h1', 'Exclusão de Tarefa');

    cy.get('mat-card-title').should('contain', 'Lavar o carro');
  });

  it('Deve excluir a tarefa corretamente', () => {
    tarefasPageObject.selecionarTarefaParaExclusao();

    cy.get('[data-cy=confirmarExclusao]').click();

    cy.contains('Tarefa excluída com sucesso!');

    cy.get('[data-cy-list-item]').should('have.length', 0);
  });
});

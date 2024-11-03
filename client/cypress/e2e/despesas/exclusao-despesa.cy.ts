import { CategoriasPageObject } from '../categorias/util/categorias.page-object';
import { DespesasPageObject } from './util/despesas.page-object';

describe('Ao navegar para a Exclusão de Despesa', () => {
  const despesasPageObject = new DespesasPageObject();
  const categoriasPageObject = new CategoriasPageObject();

  beforeEach(() => {
    cy.limparDados();

    cy.registrar();

    cy.wait(2000);

    cy.url().should('contain', 'dashboard');

    cy.visit('/categorias');

    categoriasPageObject.inserirCategoria();

    cy.visit('/despesas');

    cy.wait(2000);

    cy.contains('h1', 'Listagem de Despesas');

    despesasPageObject.inserirDespesa();
  });

  it('Deve exibir os detalhes corretos da despesa a ser excluída', () => {
    despesasPageObject.selecionarDespesaParaExclusao();

    cy.contains('h1', 'Exclusão de Despesa');

    cy.get('mat-card-title').should('contain', 'Compra de material');
  });

  it('Deve excluir a despesa corretamente', () => {
    despesasPageObject.selecionarDespesaParaExclusao();

    cy.get('[data-cy=confirmarExclusao]').click();

    cy.contains('Despesa excluída com sucesso!');

    cy.get('[data-cy-list-item]').should('have.length', 0);
  });
});

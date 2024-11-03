import { CategoriasPageObject } from './util/categorias.page-object';

describe('Ao navegar para a Exclusão de Categoria', () => {
  const categoriasPageObject = new CategoriasPageObject();

  beforeEach(() => {
    cy.limparDados();

    cy.registrar();

    cy.wait(2000);

    cy.url().should('contain', 'dashboard');

    cy.visit('/categorias');

    cy.wait(2000);

    cy.contains('h1', 'Listagem de Categorias');

    categoriasPageObject.inserirCategoria();
  });

  it('Deve exibir os detalhes corretos da categoria a ser excluída', () => {
    categoriasPageObject.selecionarCategoriaParaExclusao();

    cy.contains('h1', 'Exclusão de Categoria');

    cy.get('mat-card-title').should('contain', 'Mercado');
  });

  it('Deve excluir o categoria corretamente', () => {
    categoriasPageObject.selecionarCategoriaParaExclusao();

    cy.get('[data-cy=confirmarExclusao]').click();

    cy.contains('Categoria excluída com sucesso!');

    cy.get('[data-cy-list-item]').should('have.length', 0);
  });
});


import { CategoriasPageObject } from './util/categorias.page-object';

describe('Ao navegar para o Cadastro de Categoria', () => {
  const categoriasPageObject = new CategoriasPageObject();

  beforeEach(() => {
    cy.limparDados();

    cy.registrar();

    cy.wait(2000);

    cy.url().should('contain', 'dashboard');

    cy.visit('/categorias');

    cy.contains('h1', 'Listagem de Categorias');
  });

  it('Deve cadastrar a categoria corretamente', () => {
    cy.get('[data-cy-list-item]').should('have.length', 0);

    categoriasPageObject.inserirCategoria();

    cy.get('[data-cy-list-item]').should('have.length', 1);
  });

  it('Deve exibir erro ao tentar cadastrar sem preencher o título', () => {
    cy.get('[data-cy=cadastrarNovo]').click();

    categoriasPageObject.titulo.focus().blur();

    cy.get('mat-error').contains('O título precisa ser preenchido.');
  });
});

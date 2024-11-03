import { CategoriasPageObject } from './util/categorias.page-object';

describe('Ao navegar para a Edição de Categoria', () => {
  const categoriasPageObject = new CategoriasPageObject();

  beforeEach(() => {
    cy.limparDados();

    cy.registrar();

    cy.wait(2000);

    cy.url().should('contain', 'dashboard');

    cy.visit('/categorias');

    cy.contains('h1', 'Listagem de Categorias');

    categoriasPageObject.inserirCategoria();
  });

  it('Deve editar a categoria corretamente', () => {
    cy.get('[data-cy-list-item]').should('have.length', 1);

    categoriasPageObject.editarCategoria({
      novoTitulo: 'Nova Categoria Editada',
    });

    cy.wait(2000);

    cy.get('[data-cy-list-item]')
      .first()
      .should('contain', 'Nova Categoria Editada');
  });

  it('Deve exibir erro ao tentar editar sem preencher o título', () => {
    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy="botaoEditar"]').click();
      });

    categoriasPageObject.titulo.focus().clear().blur();

    cy.get('mat-error').should('contain', 'O título precisa ser preenchido.');
  });
});

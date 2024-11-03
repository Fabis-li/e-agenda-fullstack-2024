
export class CategoriasPageObject {
  get titulo() {
    return cy.get('[data-cy=titulo]');
  }

  public inserirCategoria({ titulo = 'Mercado' } = {}) {
    cy.get('[data-cy=cadastrarNovo]').click();

    this.titulo.type(titulo);

    cy.get('button[type=submit]').click();
  }

  public editarCategoria({ novoTitulo = 'Nova Categoria Editada' } = {}) {
    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy="botaoEditar"]').click();
      });

    cy.url().should('contain', '/categorias/editar');

    this.titulo.clear().type(novoTitulo);

    cy.get('button[type=submit]').click();

    cy.url().should('contain', '/categorias');
  }

  public selecionarCategoriaParaExclusao() {
    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy="botaoExcluir"]').click();
      });

    cy.url().should('contain', '/categorias/excluir');
  }
}

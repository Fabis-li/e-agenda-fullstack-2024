import { CategoriasPageObject } from '../categorias/util/categorias.page-object';
import { DespesasPageObject } from './util/despesas.page-object';

describe('Ao navegar para o Cadastro de Despesas', () => {
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
  });

  it('Deve cadastrar a despesa corretamente', () => {
    cy.get('[data-cy-list-item]').should('have.length', 0);

    despesasPageObject.inserirDespesa();

    cy.get('[data-cy-list-item]').should('have.length', 1);
  });

  it('Deve exibir erro ao tentar cadastrar sem preencher a descrição', () => {
    cy.get('[data-cy=cadastrarNovo]').click();

    despesasPageObject.descricao.focus().blur();

    cy.get('mat-error').contains('A descrição precisa ser preenchida.');
  });

  it('Deve exibir erro ao tentar cadastrar sem selecionar categorias', () => {
    cy.get('[data-cy=cadastrarNovo]').click();

    despesasPageObject.categoriasSelecionadas.focus().blur();

    cy.get('mat-error').contains(
      'Ao menos uma categoria precisa ser selecionada.'
    );
  });
});

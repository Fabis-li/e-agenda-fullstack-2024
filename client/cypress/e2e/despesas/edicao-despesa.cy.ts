import { CategoriasPageObject } from '../categorias/util/categorias.page-object';
import { DespesasPageObject } from './util/despesas.page-object';

describe('Ao navegar para a Edição de Despesa', () => {
  const despesasPageObject = new DespesasPageObject();
  const categoriasPageObject = new CategoriasPageObject();

  beforeEach(() => {
    cy.limparDados();

    cy.registrar();

    cy.wait(2000);

    cy.url().should('contain', 'dashboard');

    cy.visit('/categorias');

    categoriasPageObject.inserirCategoria();

    categoriasPageObject.inserirCategoria({ titulo: 'Lazer' });

    cy.visit('/despesas');

    cy.wait(2000);

    cy.contains('h1', 'Listagem de Despesas');

    despesasPageObject.inserirDespesa();
  });

  it('Deve editar a despesa corretamente', () => {
    cy.get('[data-cy-list-item]').should('have.length', 1);

    despesasPageObject.editarDespesa({
      novaDescricao: 'Nova Despesa Editada',
      novoValor: 200.0,
      novaData: '2025-02-01',
      formaPagamentoIndex: 1,
      categoriasSelecionadasIndices: [0, 1],
    });

    cy.wait(2000);

    cy.get('[data-cy-list-item]')
      .first()
      .should('contain', 'Nova Despesa Editada');
  });

  it('Deve exibir erro ao tentar editar sem preencher a descrição', () => {
    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy="botaoEditar"]').click();
      });

    despesasPageObject.descricao.focus().clear().blur();

    cy.get('mat-error').should(
      'contain',
      'A descrição precisa ser preenchida.'
    );
  });

  it('Deve exibir erro ao tentar editar sem preencher o valor', () => {
    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy="botaoEditar"]').click();
      });

    despesasPageObject.valor.focus().clear().blur();

    cy.get('mat-error').should('contain', 'O valor precisa ser preenchido.');
  });
});

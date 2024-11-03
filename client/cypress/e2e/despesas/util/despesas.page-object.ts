export class DespesasPageObject {
  get descricao() {
    return cy.get('[data-cy=descricao]');
  }

  get valor() {
    return cy.get('[data-cy=valor]');
  }

  get data() {
    return cy.get('[data-cy=data]');
  }

  get formaPagamento() {
    return cy.get('[data-cy=formaPagamento]');
  }

  get categoriasSelecionadas() {
    return cy.get('[data-cy=categoriasSelecionadas]');
  }

  public inserirDespesa({
    descricao = 'Compra de material',
    valor = 100,
    data = '2025-01-01',
    formaPagamentoIndex = 1,
    categoriasSelecionadasIndices = [0],
  } = {}) {
    cy.get('[data-cy=cadastrarNovo]').click();

    if (descricao) this.descricao.type(descricao);
    if (valor) this.valor.type(valor.toString());
    if (data) this.data.type(data);

    if (formaPagamentoIndex !== undefined) {
      this.formaPagamento.click();

      cy.get('mat-option').eq(formaPagamentoIndex).click();

      this.formaPagamento.focus().type('{esc}');
    }

    if (categoriasSelecionadasIndices.length > 0) {
      this.categoriasSelecionadas.click();

      categoriasSelecionadasIndices.forEach((index) => {
        cy.get('mat-option').eq(index).click();
      });

      this.categoriasSelecionadas.focus().type('{esc}');
    }

    cy.get('button[type=submit]').click();
  }

  public editarDespesa({
    novaDescricao = 'Nova Despesa Editada',
    novoValor = 200.0,
    novaData = '2025-02-01',
    formaPagamentoIndex = 2,
    categoriasSelecionadasIndices = [0],
  } = {}) {
    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy="botaoEditar"]').click();
      });

    cy.url().should('contain', '/despesas/editar');

    if (novaDescricao) {
      this.descricao.clear().type(novaDescricao);
    }

    if (novoValor) {
      this.valor.clear().type(novoValor.toString());
    }

    if (novaData) {
      this.data.clear().type(novaData);
    }

    if (formaPagamentoIndex !== undefined) {
      this.formaPagamento.click();

      cy.get(`mat-option`).eq(formaPagamentoIndex).click();

      this.formaPagamento.focus().type('{esc}');
    }

    if (categoriasSelecionadasIndices.length > 0) {
      this.categoriasSelecionadas.click();

      categoriasSelecionadasIndices.forEach((index) => {
        cy.get('mat-option')
          .eq(index)
          .then((opcao) => {
            if (!opcao.is(':checked')) {
              cy.wrap(opcao).click();
            }
          });
      });

      this.categoriasSelecionadas.focus().type('{esc}');
    }

    cy.get('button[type=submit]').click();

    cy.url().should('contain', '/despesas');
  }

  public selecionarDespesaParaExclusao() {
    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy="botaoExcluir"]').click();
      });

    cy.url().should('contain', '/despesas/excluir');
  }
}

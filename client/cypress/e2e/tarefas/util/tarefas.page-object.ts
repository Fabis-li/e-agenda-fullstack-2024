export class TarefasPageObject {
  get titulo() {
    return cy.get('[data-cy=titulo]');
  }

  get prioridade() {
    return cy.get('[data-cy=prioridade]');
  }

  get tituloItem() {
    return cy.get('[data-cy=tituloItem]');
  }

  public inserirTarefa({
    titulo = 'Lavar o carro',
    prioridadeIndex = 0,
    itens = ['Comprar sabão', 'Enxaguar o carro'],
  } = {}) {
    cy.get('[data-cy=cadastrarNovo]').click();

    if (titulo) this.titulo.type(titulo);

    this.prioridade.click();

    cy.get('mat-option').eq(prioridadeIndex).click();

    this.prioridade.focus().type('{esc}');

    itens.forEach((item) => {
      this.tituloItem.type(item);

      cy.get('[data-cy=adicionarItem]').click();
    });

    cy.get('button[type=submit]').click();
  }

  public editarTarefa({
    novoTitulo = 'Nova Tarefa Editada',
    novaPrioridadeIndex = 1,
    novosItens = ['Item Editado 1', 'Item Editado 2'],
  } = {}) {
    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy="botaoEditar"]').click();
      });

    cy.url().should('contain', '/tarefas/editar');

    if (novoTitulo) {
      this.titulo.clear().type(novoTitulo);
    }

    if (novaPrioridadeIndex !== undefined) {
      this.prioridade.click();

      cy.get('mat-option').eq(novaPrioridadeIndex).click();

      this.prioridade.focus().type('{esc}');
    }

    cy.get('[data-cy="removerItem"]').each((btnRemover) => {
      cy.wrap(btnRemover).click();
    });

    novosItens.forEach((item) => {
      this.tituloItem.type(item);
      cy.get('button').contains('Adicionar Item').click();
    });

    cy.get('button[type=submit]').click();

    cy.url().should('contain', '/tarefas');
  }

  public selecionarTarefaParaExclusao() {
    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy="botaoExcluir"]').click();
      });

    cy.url().should('contain', '/tarefas/excluir');
  }
}

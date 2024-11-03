export class CompromissosPageObject {
  get assunto() {
    return cy.get('[data-cy=assunto]');
  }

  get data() {
    return cy.get('[data-cy=data]');
  }

  get horaInicio() {
    return cy.get('[data-cy=horaInicio]');
  }

  get horaFim() {
    return cy.get('[data-cy=horaTermino]');
  }

  get tipoLocal() {
    return cy.get('[data-cy=tipoLocal]');
  }

  get local() {
    return cy.get('[data-cy=local]');
  }

  get link() {
    return cy.get('[data-cy=link]');
  }

  get contatoId() {
    return cy.get('[data-cy=contatoId]');
  }

  public inserirCompromisso({
    assunto = 'Reunião de planejamento',
    data = '2025-01-01',
    horaInicio = '09:00',
    horaFim = '11:00',
    local = 'Sala de reuniões',
    tipoLocalIndex = 1,
    contatoId = 1,
  } = {}) {
    cy.get('[data-cy=cadastrarNovo]').click();

    if (assunto) this.assunto.type(assunto);
    if (data) this.data.type(data);
    if (horaInicio) this.horaInicio.type(horaInicio);
    if (horaFim) this.horaFim.type(horaFim);
    if (local) this.local.type(local);

    this.tipoLocal.click();

    cy.get(`mat-option`).last().click();

    if (contatoId) {
      this.contatoId.click();

      cy.get(`mat-option`).first().click();
    }

    cy.get('button[type=submit]').click();
  }

  public editarCompromisso({
    novoAssunto = 'Reunião de revisão',
    novaData = '2025-01-01',
    novaHoraInicio = '10:00',
    novaHoraFim = '12:00',
    novoLocal = 'Sala de conferência',
    novoTipoLocalIndex = 1,
    novoContatoId = 1,
  } = {}) {
    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy="botao-editar"]').click();
      });

    if (novoAssunto) this.assunto.clear().type(novoAssunto);
    if (novaData) this.data.clear().type(novaData);
    if (novaHoraInicio) this.horaInicio.clear().type(novaHoraInicio);
    if (novaHoraFim) this.horaFim.clear().type(novaHoraFim);
    if (novoLocal) this.local.clear().type(novoLocal);

    if (novoTipoLocalIndex !== undefined) {
      this.tipoLocal.click();

      cy.get(`mat-option`).eq(novoTipoLocalIndex).click();
    }

    if (novoContatoId !== undefined) {
      this.contatoId.click();

      cy.get(`mat-option`).first().click();

      this.contatoId.focus().type('{esc}');
    }

    cy.get('button[type=submit]').click();
  }

  public selecionarCompromissoParaExclusao() {
    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy="botao-excluir"]').click();
      });

    cy.url().should('contain', '/compromissos/excluir');
  }
}

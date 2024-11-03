import { ContatosPageObject } from '../contatos/util/contatos.page-object';
import { CompromissosPageObject } from './util/compromissos.page-object';

describe('Ao navegar para a Edição de Compromissos', () => {
  const compromissosPageObject = new CompromissosPageObject();
  const contatosPageObject = new ContatosPageObject();

  beforeEach(() => {
    cy.limparDados();

    cy.registrar();

    cy.wait(2000);

    cy.url().should('contain', 'dashboard');

    cy.visit('/contatos');

    contatosPageObject.inserirContato();

    cy.visit('/compromissos');

    cy.wait(2000);

    cy.contains('h1', 'Listagem de Compromissos');

    compromissosPageObject.inserirCompromisso();
  });

  it('Deve editar o compromisso corretamente', () => {
    cy.get('[data-cy-list-item]').should('have.length', 1);

    compromissosPageObject.editarCompromisso({
      novoAssunto: 'Reunião de estratégia',
      novaData: '2025-02-01',
      novaHoraInicio: '14:00',
      novaHoraFim: '16:00',
      novoLocal: 'Sala de estratégia',
    });

    cy.wait(2000);

    cy.get('[data-cy-list-item]')
      .first()
      .should('contain', 'Reunião de estratégia');
  });
});

import { ContatosPageObject } from '../contatos/util/contatos.page-object';
import { CompromissosPageObject } from './util/compromissos.page-object';

describe('Ao navegar para o Cadastro de Compromisso', () => {
  const compromissosPageObject = new CompromissosPageObject();
  const contatosPageObject = new ContatosPageObject();

  beforeEach(() => {
    cy.limparDados();

    cy.registrar();

    cy.wait(2000);

    cy.url().should('contain', '/dashboard');

    cy.visit('/contatos');

    contatosPageObject.inserirContato();

    cy.visit('/compromissos');

    cy.contains('h1', 'Listagem de Compromissos');
  });

  it('Deve cadastrar o compromisso corretamente', () => {
    cy.get('[data-cy-list-item]').should('have.length', 0);

    compromissosPageObject.inserirCompromisso();

    cy.get('[data-cy-list-item]').should('have.length', 1);
  });

  it('Deve exibir erro ao tentar cadastrar sem preencher o assunto', () => {
    cy.get('[data-cy=cadastrarNovo]').click();

    compromissosPageObject.assunto.focus().blur();

    cy.get('mat-error').contains('O assunto precisa ser preenchido.');
  });
});

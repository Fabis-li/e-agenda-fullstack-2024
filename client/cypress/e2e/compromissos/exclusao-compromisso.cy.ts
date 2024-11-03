
import { ContatosPageObject } from "../contatos/util/contatos.page-object";
import { CompromissosPageObject } from "./util/compromissos.page-object";

describe('Ao navegar para a Exclusão de Compromissos', () => {
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

  it('Deve exibir os detalhes corretos do compromisso a ser excluído', () => {
    compromissosPageObject.selecionarCompromissoParaExclusao();

    cy.contains('h1', 'Exclusão de Compromisso');

    cy.get('mat-card-title').should('contain', 'Reunião de planejamento');
  });

  it('Deve excluir o compromisso corretamente', () => {
    compromissosPageObject.selecionarCompromissoParaExclusao();

    cy.get('[data-cy=confirmarExclusao]').click();

    cy.contains('Compromisso excluído com sucesso!');

    cy.get('[data-cy-list-item]').should('have.length', 0);
  });
})

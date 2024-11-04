describe('Processo de Login do Usuário', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve visitar a pagina inicial', () => {

    cy.contains('Login de Usuário'); // Verifica se o texto "Login de Usuário" está presente na página
  });

  it('Deve autenticar usuário corretamente e redirecionar', () => {

    cy.get('[data-cy=login]').type('teste6');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);// esperar 1 segundo

    cy.contains('Painel de Controle')

    cy.url().should('contain', '/dashboard');
  });
})

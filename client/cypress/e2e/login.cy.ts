describe('Processo de Login do Usuário', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve visitar a pagina inicial', () => {

    cy.contains('Login de Usuário'); // Verifica se o texto "Login de Usuário" está presente na página
  });

  it('Deve autenticar usuário corretamente e redirecionar', () => {

    cy.get('[data-cy=login]').type('teste3');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);// esperar 1 segundo

    cy.contains('Painel de Controle')

    cy.url().should('contain', '/dashboard');
  });

  it('Deve notificar sobre formulário de login inválido', () => {

    cy.get('[data-cy=submit]').click();

    cy.contains('Por favor, corriga os campos inválidos do formulário');

  });

})

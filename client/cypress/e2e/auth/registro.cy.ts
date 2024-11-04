describe('Deve realizar o processo de registro de usuário', () => {

  beforeEach(() => {
    cy.visit('/registro');
  });


  it('Deve visitar a página de registro', () => {

    cy.contains('Registro de Usuário'); // Verifica se o texto "Registro de Usuário" está presente na página
  });

  it('Deve registrar usuário corretamente e redirecionar', () => {

    cy.get('[data-cy=nomeCompleto]').type('Teste6')

    cy.get('[data-cy=nomeUsuario]').type('teste6');

    cy.get('[data-cy=email]').type('teste6@gmail.com');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=botaoRegistrar]').click();

    cy.wait(2000);

    cy.url().should('contain', '/dashboard');
  });

});

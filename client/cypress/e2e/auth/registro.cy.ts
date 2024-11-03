describe('Deve realizar o processo de registro de usuário', () => {

  beforeEach(() => {
    cy.visit('/registro');
  });


  it('Deve visitar a página de registro', () => {

    cy.contains('Registro de Usuário'); // Verifica se o texto "Registro de Usuário" está presente na página
  });

  it('Deve registrar usuário corretamente e redirecionar', () => {

    cy.get('[data-cy=nomeCompleto]').type('Teste4')

    cy.get('[data-cy=nomeUsuario]').type('teste4');

    cy.get('[data-cy=email]').type('teste4@gmail.com');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('button[type=submit]').click();
  });

});

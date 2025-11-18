// Custom command untuk login
Cypress.Commands.add('login', (username = 'admin', password = 'admin') => {
  cy.visit('/login');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
});

// Custom command untuk logout
Cypress.Commands.add('logout', () => {
  cy.contains('Keluar').click();
  cy.url().should('include', '/login');
});

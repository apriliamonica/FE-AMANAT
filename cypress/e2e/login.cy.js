describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.contains('AMANAT').should('be.visible');
    cy.contains('Aplikasi Manajemen Surat dan Arsip Terpadu').should('be.visible');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('admin');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard Sekretaris Kantor').should('be.visible');
  });

  it('should show validation error with empty fields', () => {
    cy.get('button[type="submit"]').click();

    cy.get('input[name="username"]:invalid').should('exist');
    cy.get('input[name="password"]:invalid').should('exist');
  });
});

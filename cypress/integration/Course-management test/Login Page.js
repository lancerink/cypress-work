/// <reference types="cypress" />

describe('Login Page', () => {
  beforeEach('go to login page', () => {
    cy.visit('/login');
  });

  it('Login in with manager account', () => {
    cy.get('#login_role > :nth-child(3)').click();
    cy.get('#login_email').type(email);
    cy.get('#login_password').type(password);
    cy.get('[type="submit"]').click();
    cy.url().should('include', 'dashboard/manager');
  });

  it('Should display title', () => {
    cy.contains('Course Management Assistant');
  });

  it('Should display login form', () => {
    const roles = ['Student', 'Teacher ', 'Manager'];
    cy.get('input[type=radio]').should('have.length', roles.length);
    roles.forEach((role) => {
      cy.get('label').contains(role);
    });
    cy.get('input[type=email]').should('be.visible');
    cy.get('input[type=password]').should('be.visible');
    cy.get('input[type=checkbox]').should('be.checked');
    cy.get('button[type=submit]').should('be.visible');
  });

  it('Should have sign up link', () => {
    cy.contains('Sign up').should('be.visible').and('have.attr', 'href');
  });

  it('Should display alert', () => {
    cy.get('input[type=email]').type('adljwaelj');
    cy.get('#login .ant-row').find('[role=alert]').should('be.visible');
    cy.get('input[type=password]').type('123456');
    cy.get('#login .ant-row').find('[role=alert]').should('be.visible').and('have.length', 2);
  });
});

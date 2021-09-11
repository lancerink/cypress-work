/// <reference types="cypress" />
describe('Visual Testing', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);
  });

  it.only('logo testing', () => {
    cy.get('#logo').matchImageSnapshot();
  });

  it('logo testing after scrolled', () => {
    cy.scrollTo(0, 300);
    cy.get('#logo').matchImageSnapshot();

    cy.scrollTo('bottom');
    cy.get('#logo').matchImageSnapshot();
  });
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';
import 'cypress-plugin-snapshots/commands';
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
  failureThreshold: 0.0,
  failureThresholdType: 'percent',
  customDiffConfig: { threshold: 0.1 },
  capture: 'viewport',
});

Cypress.Commands.add('login', (email, password) => {
  const loginPath = '/login';
  const log = Cypress.log({
    name: 'login',
    displayName: 'LOGIN',
    message: `${email}`,
  });

  cy.location('pathname').then((currentPath) => {
    if (currentPath !== loginPath) {
      cy.visit(loginPath);
    }
  });

  cy.intercept('POST', '/api/login').as('loginRes');
  cy.get('#login_role > :nth-child(3)').click();
  cy.get('#login_email').type(email);
  cy.get('#login_password').type(password);
  cy.get('[type="submit"]').click();

  cy.wait('@loginRes').then((res) => {
    const user = res.response.body.data;
    Cypress.env('token', user.token);
    log.set({
      consoleProps() {
        return {
          userId: user.userId,
          role: user.role,
          token: user.token,
        };
      },
    });
  });
});

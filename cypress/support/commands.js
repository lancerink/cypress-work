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



Cypress.Commands.add('login', (email, password) => {

    const loginPath = '/login'

    cy.location('pathname').then((currentPath) => {
        if (currentPath !== loginPath){
            cy.visit(loginPath)
        }
    })

    cy.intercept('POST','/api/login').as('loginRes')

    cy.get('#login_role > :nth-child(3)').click()
    cy.get('#login_email').type(email)
    cy.get('#login_password').type(password)
    cy.get('[type="submit"').click()

    cy.wait('@loginRes').then( () => {

    })


})

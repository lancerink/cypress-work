/// <reference types="cypress" />

describe ('Login Page',() => {

    beforeEach('go to login page', ()=> {
        cy.visit('/login')
    })
    
    it('Login in with manager account', () => {
        cy.login('manager@admin.com','111111')
        cy.url().should('include','dashboard/manager')
    })

    it('Should display title', () => {
        cy.contains('Course Management Assistant')
      })
    
    it('Should display login form', () => {
        cy.get('#login').should('be.visible')
        cy.get('#login_role').should('be.visible')
        cy.get('input[type=email]').should('be.visible');
        cy.get('input[type=password]').should('be.visible');
      })

    it('Should have sign up link', () => {
        cy.contains('Sign up').should('be.visible').and('have.attr', 'href');
      })

    it('Should display alert', () => {
        cy.login('manager@admin.com','123456')
        cy.get('.ant-message').find('.ant-message-notice').should('be.visible')

      })
    
    
})
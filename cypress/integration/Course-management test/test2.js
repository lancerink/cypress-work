// const { get } = require("cypress/types/lodash")

const { default: MenuItem } = require("antd/lib/menu/MenuItem")

describe ('first test case', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
      })

    it ('check logo', () => {
        cy.get('#logo').should('be.visible')

    })

    it('check 5 items in the menu',() =>{
        cy.get('nav').find('li').should('have.length',5)
    })

    it('go to the homepage via navigator',() => {
        cy.get('a[href*="/login"]').click()
        cy.get('#login_email') .should('be.visible')
        cy.get('#logo').click()
        cy.get('.slider').should('be.visible')
    })

    it ('check header is always visible', () => {
        cy.scrollTo('bottom')
        cy.get('#header').should('be.visible')
    })

    it ('check login status',()=>{
        cy.get('a[href*="/login"]').click()
        cy.get('#login_email').type('annitest@gmail.com')
        cy.get('#login_password').type('123qweasd')
        cy.get('a[href*="/login"]').should('not.be.visible')
    })


})

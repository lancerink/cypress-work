/// <reference types="cypress" />

describe ('Login form',() => {

    it('Add course',()=>{
        cy.visit('/')
        cy.get('a[href*="/login"]').click()
        cy.get('#login_role > :nth-child(3)').click()
        cy.get('#login_email').type('manager@admin.com')
        cy.get('#login_password').type('111111')
        cy.get('[type="submit"').click() // how to add command?
        cy.wait(9000)
        cy.url().should('include','dashboard/manager')
        cy.visit('/dashboard/manager/courses/add-course')
        cy.get('#name').type('test course')
        //cy.get('#teacherId').type('a') //unable to select teacher, it's still Off after logging in
        //cy.get('ant-select-item-option').first().click()
        cy.get('#type').click()
        cy.get('[title~=PHP]').click()
        cy.get('[title~=R]').click()
        cy.get('[placeholder="Select date"]').click() 
        cy.get('.ant-picker-date-panel').contains('30').click()
        cy.get('#price').type('45')
        cy.get('#maxStudents').type('4')
        cy.get('.ant-input-group > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type('5') //any other method on selecting?
        cy.get('[placeholder="Course description"]').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500ss popularised in the 1960s')
        cy.get('[type="submit"]').click

    })

})
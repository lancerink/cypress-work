/// <reference types="cypress" />

describe ('Login form',() => {

    it ('Login with a manager account',()=>{
        cy.visit('http://localhost:3000/')
        cy.get('a[href*="/login"]').click()
        cy.get('#login_role > :nth-child(3)').click()
        cy.get('#login_email').type('manager@admin.com')
        cy.get('#login_password').type('111111')
        cy.get('[type="submit"').click()
        cy.wait(9000)
        cy.url().should('include','manager')
    })
})

describe ('Add Course form',() => {
    it ('Go to Add Course Page', ()=>{
        cy.visit('http://localhost:3000/dashboard/manager/courses/add-course')
    })

    it('Create Course', () => {
        cy.get('#name').type('test course')
        cy.get('.ant-layout-sider-children').click()
        cy.get('#teacherId').type('a').select('Jaime')
        cy.get('.ant-form-item-control-input-content').select('C','R','Python')
        cy.get('#startTime').contains('24').click()
        cy.get('price').type('123')
        cy.get('#maxStudents').type('22')
        cy.get('#detail').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industtandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum')
        cy.get('[type= "submit').find('.ant-btn ant-btn-primary').click()
    })

    it('Course Schedule', () => {
    })




})
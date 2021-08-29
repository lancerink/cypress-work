/// <reference types="cypress" />

describe ('Course Management',() => {

    beforeEach( () => {
        cy.login('manager@admin.com','111111')
        cy.url().should('include','dashboard/manager')
    })

    it('Add course',()=>{
        cy.visit('/dashboard/manager/courses/add-course')
        cy.get('#name').type('test course')
        cy.get('#teacherId').type('ee')
        cy.get('[title="Miss Aubree Reilly II"]').click()
        cy.get('#type').click()
        cy.get('[title~=PHP]').click()
        cy.get('[title~=R]').click()
        cy.get('[placeholder="Select date"]').click() 
        cy.get('.ant-picker-date-panel').contains('30').click()
        cy.get('#price').type('450')
        cy.get('#maxStudents').type('4')
        cy.get('[role="spinbutton"]').last().type('5') 
        cy.get('[placeholder="Course description"]').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500ss popularised in the 1960s')
        cy.get('[type="submit"]').first().click()
        //create course

        cy.get('#schedule_chapters_0_name').type('name test')
        cy.get('#schedule_chapters_0_content').type('chapter content test')
        cy.get('[type="button"]').first().click()
        cy.get('#schedule_chapters_1_name').type('name test1')
        cy.get('#schedule_chapters_1_content').type('chapter content test1')
        cy.get('#schedule_classTime_0_time').click()
        cy.get('.ant-picker-time-panel-column').first().contains('10').click()
        cy.get('.ant-picker-ok').click()
        cy.get('.ant-select-selector').last().click()
        cy.get('[title="Sunday"]').click()
        cy.get('[type="submit"]').last().click()
        //submit schedule

        cy.get('.ant-result-title').contains('Successfully')
        //assert success text




    })


})
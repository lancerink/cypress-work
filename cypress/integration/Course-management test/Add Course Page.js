/// <reference types="cypress" />
import { addDays, format } from 'date-fns';

describe('Course Management', () => {
  beforeEach(() => {
    cy.login('manager@admin.com', '111111').then(() => {
      cy.visit('/dashboard/manager/courses/add-course');
    });
  });

  it('Add course', () => {
    cy.get('#name').type('test course');
    cy.get('#teacherId').type('ee');
    cy.get('[title="Miss Aubree Reilly II"]').click();
    cy.get('#type').click();
    cy.get('[title~=PHP]').click();
    cy.get('[title~=R]').click();
    cy.get('[placeholder="Select date"]')
      .click()
      .then(() => {
        const title = format(addDays(new Date(), 2), 'yyyy-MM-dd');
        cy.get(`td[title=${title}]`).click();
      });
    cy.get('#price').type('450');
    cy.get('#maxStudents').type('4');
    cy.get('[role="spinbutton"]').last().type('5');
    cy.get('[placeholder="Course description"]').type(
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500ss popularised in the 1960s'
    );
    cy.get('[type="submit"]').first().click();
    //create course

    cy.get('input[placeholder="Chapter Name"]').first().type('name test');
    cy.get('input[placeholder="Chapter content"]').first().type('chapter content test');
    cy.get('[type="button"]').first().click();
    cy.get('input[placeholder="Chapter Name"]').eq(1).type('name test1');
    cy.get('input[placeholder="Chapter content"]').eq(1).type('chapter content test1');
    cy.get('#schedule_classTime_0_time').click();
    cy.get('.ant-picker-time-panel-column').first().contains('10').click();
    cy.get('.ant-picker-time-panel-column').eq(1).contains('07').click();
    cy.get('.ant-picker-time-panel-column').eq(2).contains('30').scrollIntoView().click();
    cy.get('.ant-picker-ok').click();
    cy.get('.ant-select-selector').last().click();
    cy.get('[title="Sunday"]').click();
    cy.get('[type="submit"]').last().click();
    //submit schedule

    cy.get('.ant-result-title').contains('Successfully');
    //assert success text
  });

  it('Upload Image', () => {
    const filepath = '/test.jpeg';
    cy.get('input[type="file"]').attachFile(filepath);
    cy.get('.ant-modal-footer > .ant-btn-primary').click();
    cy.get('.ant-upload-span').find('img').should('have.attr', 'src');
  });

  it('Add course alert', () => {
    cy.get('[type="submit"]').first().click();
    cy.get('.ant-form-vertical').should('be.visible').find('[role=alert]').and('have.length', 8);
  });

  it('Should auto correct', () => {
    cy.get('#maxStudents').type('555');
    cy.get('#price').type('10000000000000000');
    cy.get('[type="submit"]').first().click();
    cy.get('#maxStudents').should('have.value', '10');
    cy.get('#price').should('have.value', '$ 9,007,199,254,740,991');
  });
});

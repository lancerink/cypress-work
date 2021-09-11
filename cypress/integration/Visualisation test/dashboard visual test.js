/// <reference types="cypress" />
describe('Visual Testing', () => {
  beforeEach(() => {
    cy.login('manager@admin.com', '111111');
    cy.intercept('GET', '/api/statistics/overview', { fixture: 'overview-data.json' }).as(
      'overviewRes'
    );
    cy.intercept('GET', '/api/statistics/student', { fixture: 'student-statistics.json' }).as(
      'studentRes'
    );
    cy.intercept('GET', '/api/statistics/teacher', { fixture: 'teacher-statistics.json' }).as(
      'teacherRes'
    );
    cy.intercept('GET', '/api/statistics/course', { fixture: 'course-statistics.json' }).as(
      'courseRes'
    );
  });

  it('Overview', () => {
    cy.wait(['@overviewRes', '@studentRes', '@teacherRes', '@courseRes'], { timeout: 10000 }).then(
      () => {
        cy.get('.ant-card').first().should('be.visible');
        cy.get('.ant-card').first().matchImageSnapshot({
          threshold: 0.1,
          thresholdType: 'pixels',
        });
      }
    );
  });

  it('SideBar', () => {
    cy.wait(['@overviewRes', '@studentRes', '@teacherRes', '@courseRes'], { timeout: 10000 }).then(
      () => {
        cy.get('.ant-layout-sider-children').should('be.visible');
        cy.get('.ant-layout-sider-children').matchImageSnapshot({
          threshold: 0.1,
          thresholdType: 'pixels',
        });
      }
    );
  });

  it('Header', () => {
    cy.wait(['@overviewRes', '@studentRes', '@teacherRes', '@courseRes'], { timeout: 10000 }).then(
      () => {
        cy.get('.ant-layout-header').should('be.visible');
        cy.get('.ant-layout-header').matchImageSnapshot({
          threshold: 0.1,
          thresholdType: 'pixels',
        });
      }
    );
  });

  it('Type', () => {
    cy.wait(['@overviewRes', '@studentRes', '@teacherRes', '@courseRes'], { timeout: 10000 }).then(
      () => {
        cy.get('.ant-card-body').eq(4).should('be.visible');
        cy.get('.ant-card-body').eq(4).matchImageSnapshot({
          threshold: 0.1,
          thresholdType: 'pixels',
        });
      }
    );
  });
});

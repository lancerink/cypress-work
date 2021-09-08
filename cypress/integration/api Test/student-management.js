/// <reference types="cypress" />

let id;

describe('Student Api', () => {
  before(() => {
    cy.login('manager@admin.com', '111111');
  });

  context('GET/students', () => {
    it('get student list', () => {
      const token = Cypress.env('token');
      const authorization = `bearer ${token}`;
      const options = {
        method: 'GET',
        url: `${Cypress.env().prod}/students?page=1&limit=3`,
        headers: {
          authorization,
        },
      };
      cy.request(options).then((res) => {
        const data = res.body.data;
        expect(res.status).to.eq(200);
        expect(data.students.length).eq(3);
      });

    });
  });
});

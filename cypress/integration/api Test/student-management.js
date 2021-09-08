/// <reference types="cypress" />
let id;
let studentName;
let studentEmail;
let studentCountry;

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

  context('POST /students', () => {
    it('can create a student', () => {
      const token = Cypress.env('token');
      const authorization = `bearer ${token}`;
      const options = {
        method: 'POST',
        url: `${Cypress.env().prod}/students`,
        headers: {
          authorization,
        },
        body: {
          name: 'test student',
          country: 'Canada',
          email: 'test@gmail.com',
          type: 0,
        },
      };

      cy.request(options).then((res) => {
        const data = res.body.data;
        studentName = data.name;
        studentEmail = data.email;
        studentCountry = data.country;
        id = data.id;
        expect(studentName).to.eq('test student');
        expect(studentEmail).to.eq('test@gmail.com');
        expect(studentCountry).to.eq('Canada');
        expect(res.status).to.eq(201);
        expect(data.id).exist;
      });
    });
  });

  context('PUT /students', () => {
    it('update student info', () => {
      const token = Cypress.env('token');
      const authorization = `bearer ${token}`;
      const options = {
        method: 'PUT',
        url: `${Cypress.env().prod}/students`,
        headers: {
          authorization,
        },
        body: {
          id,
          name: 'updated Name',
          country: 'China',
          type: 2,
          email: 'test123@gmail.com',
        },
      };
      cy.request(options).then((res) => {
        const data = res.body.data;
        studentName = data.name;
        studentEmail = data.email;
        studentCountry = data.country;
        id = data.id;
        expect(res.status).to.eq(200);
        expect(id).to.eq(id);
        expect(studentName).to.eq('updated Name');
        expect(studentEmail).to.eq('test123@gmail.com');
        expect(studentCountry).to.eq('China');
      });
    });
  });

  context('DELETE /students', () => {
    it('can delete student', () => {
      const token = Cypress.env('token');
      const authorization = `bearer ${token}`;
      const options = {
        method: 'DELETE',
        url: `${Cypress.env().prod}/students/${id}`,
        headers: {
          authorization,
        },
      };
      cy.request(options).then((res) => {
        const data = res.body.data;
        expect(res.status).to.eq(200);
      });
    });
  });
});

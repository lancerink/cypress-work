/// <reference types="cypress" />

describe('Course Api', () => {
  beforeEach(() => {
    cy.login('manager@admin.com', '111111');
  });

  context('GET /courses', () => {
    it('get a list of course', () => {
      const token = Cypress.env('token');
      const authorization = `bearer ${token}`;
      const options = {
        method: 'GET',
        url: `${Cypress.env().prod}/courses?page=1&limit=3`,
        headers: {
          authorization,
        },
      };
      cy.request(options).then((res) => {
        const data = res.body.data;
        expect(res.status).to.eq(200);
        expect(Array.isArray(data.courses)).to.be.true;
        expect(data.courses.length).to.eq(3);
        expect(typeof data.total).eq('number');
        expect(data.paginator).exist;
      });
    });
  });

  context('GET /course/detail', () => {
    const token = Cypress.env('token');
    const authorization = `bearer ${token}`;
    const options = {
      method: 'GET',
      url: `${Cypress.env().prod}/courses/detail?id=2`,
      headers: {
        authorization,
      },
    };
    it('get a course with detail', () => {
      cy.request(options).then((res) => {
        const data = res.body.data;
        const chapters = data.schedule.chapters;
        expect(res.status).to.eq(200);
        expect(data.id).to.eq(2);
        expect(data.maxStudents).to.eq(5);
        expect(data.durationUnit).to.eq(1);
        expect(data.name).to.eq('Alessandra Schiller');
        expect(data.price).to.eq(100);
        expect(data.teacher.country).to.eq('Moldova');
        expect(chapters.length).to.eq(12);
      });
    });
  });
});

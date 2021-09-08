/// <reference types="cypress" />
import { AES } from 'crypto-js';

describe('login api', () => {
  context('POST /login', () => {
    it('should login with student account', () => {
      const psw = AES.encrypt('111111', 'cms').toString();
      const options = {
        method: 'POST',
        url: `${Cypress.env().prod}/login`,
        body: {
          email: 'student@admin.com',
          password: psw,
          role: 'student',
        },
      };

      cy.request(options).then((res) => {
        const data = res.body.data;
        expect(data.role).eq('student');
        expect(data.token).exist;
        expect(typeof data.userId).eq('number');
      });
    });
  });
});

/// <reference types="cypress" />

describe ('first test case', () => {
    it ('assert test', () => {
        let a = 10
        let b = 25
        expect(a+b).to.equal(35)
    })

})
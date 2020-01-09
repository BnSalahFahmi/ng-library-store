/// <reference types="Cypress" />
const libraries = require('../../fixtures/books')
context("Books", () => {

    beforeEach(() => {

    });

    it("should create book", () => {
        cy.visit("/book/list");
        cy.get('.pull-right').click();
        cy.get('input[name="name"]').type('Test Driven Development');
        cy.get('textarea[name="description"]').type('Follows two TDD projects from start to finish, illustrating techniques programmers can use to increase the quality of their work');
        cy.get('input[name="author"]').type('Kent Beck');
        cy.get('input[name="img"]').type('https://images-na.ssl-images-amazon.com/images/I/41pO5GqNtzL._AC_SX368_.jpg');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/book/list');
        cy.get('.toast-message').should('contain', 'Book Saved Successfully');
    });

    it("should delete book", () => {
        cy.visit("/book/list");
        cy.get('button[name="delete"]').eq(10).click();
        cy.get('.toast-message').should('contain', 'Book Removed Successfully');
    });
});
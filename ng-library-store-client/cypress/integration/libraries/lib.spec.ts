/// <reference types="Cypress" />
const libraries = require('../../fixtures/libraries')
context("Libraries", () => {

    beforeEach(() => {
        
    });

    it("should create library", () => {
        cy.visit("/library/list");
        cy.get('.pull-right').click();
        cy.get('input[name="name"]').type('BNF Richelieu Site');
        cy.get('textarea[name="address"]').type('58 Rue de Richelieu, 75002 Paris');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/library/list');
        cy.get('.toast-message').should('contain', 'Library Saved Successfully');
    });

    it("should delete library", () => {
        cy.visit("/library/list");
        cy.get('button[name="delete"]').eq(6).click();
        cy.get('.toast-message').should('contain', 'Library Removed Successfully');
    });
});
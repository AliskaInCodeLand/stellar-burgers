/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    addIngredient(name: string): Chainable<Element>;
    checkIngredientInConstructor(name: string): Chainable<Element>;
  }
}
  
Cypress.Commands.add('addIngredient', (name: string) => {
  cy.get('[data-cy="ingredient-item"]')
    .contains(name)
    .closest('[data-cy="ingredient-item"]')
    .contains('Добавить')
    .click()
});

Cypress.Commands.add('checkIngredientInConstructor', (name: string) => {
  cy.get('[data-cy="constructor-element"]').should('contain', name)
});

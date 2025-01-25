import { equal } from 'assert';
import * as orderFixture from '../fixtures/order.json';

const SELECTORS = {
  modal: '[data-cy="modal"]',
  modalClose: '[data-cy="modal-close"]',
  ingredientDetails: '[data-cy="ingredient-details"]',
  constructorBun: '[data-cy="constructor-bun"]',
  orderNumber: '[data-cy="order-number"]',
  deleteButton: '[class="constructor-element__action pr-2"]'
};

const INGREDIENTS = {
  bun: 'Краторная булка N-200i',
  ingredient: 'Биокотлета из марсианской Магнолии',
  sauce: 'Соус фирменный Space Sauce'
};

describe('Tесты страницы конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-item"]').as('ingredientItem');
    cy.get('[data-cy="constructor-element"]').as('constructorElement');
    cy.get('[data-cy="order-button"]').as('orderButton');
  });

  describe('Тест модального окна', () => {
    it('Тест на открытие модального окна', () => {
      cy.get(SELECTORS.ingredientDetails).should('not.exist');
      cy.get('@ingredientItem')
        .contains(INGREDIENTS.bun)
        .click();
      cy.get(SELECTORS.modal).should('exist');
      cy.get(SELECTORS.ingredientDetails)
        .should('exist')
        .and('contain', INGREDIENTS.bun)
        .and('contain', 'Калории,')
        .and('contain', '420');
      cy.get(SELECTORS.modalClose).click();
      cy.get(SELECTORS.ingredientDetails).should('not.exist');
    });
    it('Тест на закрытие модального окна по клику на overlay', () => {
      cy.get('@ingredientItem')
        .contains(INGREDIENTS.bun)
        .click();
      cy.get(SELECTORS.modal).should('exist');
      cy.get('body').click(0, 0);
      cy.get(SELECTORS.modal).should('not.exist');
    });
    it('Тест на закрытие модального окна по клику на ESC', () => {
      cy.get('@ingredientItem')
        .contains(INGREDIENTS.bun)
        .click();
      cy.get(SELECTORS.modal).should('exist');
      cy.get('body').type('{esc}');
      cy.get(SELECTORS.modal).should('not.exist');
    });
  });

  describe('Тест конструктора', () => {
    it('Тест блокировки кнопки оформления заказа', () => {
      cy.get('@orderButton').should('be.disabled');
    });
    it('Тест что конструктор пустой', () => {
      cy.get(SELECTORS.constructorBun).should('not.exist');
    });
    it('Добавление ингредиентов в конструктор', () => {
      cy.addIngredient(INGREDIENTS.bun);
      cy.get(SELECTORS.constructorBun).should('contain', INGREDIENTS.bun);
      cy.addIngredient(INGREDIENTS.ingredient);
      cy.checkIngredientInConstructor(INGREDIENTS.ingredient);

      cy.addIngredient(INGREDIENTS.sauce);
      cy.checkIngredientInConstructor(INGREDIENTS.sauce);

      cy.get('@orderButton').should('be.enabled').click();
      cy.location('pathname').should('eq', '/login');
    });
    it('Тест кнопки удаления ингредиента из конструктора', () => {
      cy.addIngredient(INGREDIENTS.ingredient);
      cy.checkIngredientInConstructor(INGREDIENTS.ingredient);

      cy.get(SELECTORS.deleteButton).click();
      cy.get('@constructorElement').should(
        'not.contain',
        INGREDIENTS.ingredient
      );
    });
  });

  describe('Проверка оформления заказа', () => {

    beforeEach(() => {
      cy.setCookie('accessToken', 'ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'REFRESH_TOKEN');
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' }).as(
        'orderFixture'
      );
      cy.visit('/');
    });
    it('Добавление ингредиентов в конструктор после авторизации', () => {
      cy.addIngredient(INGREDIENTS.bun);
      cy.addIngredient(INGREDIENTS.ingredient);

      cy.get('@orderButton').should('be.enabled').click();

      cy.get(SELECTORS.modal).should('exist');
      cy.get(SELECTORS.orderNumber).should(
        'have.text',
        orderFixture.order.number
      );

      cy.get(SELECTORS.modalClose).click();
      cy.get(SELECTORS.constructorBun).should('not.exist');
      cy.get('[data-cy="constructor-ingredient"]').should('not.exist');
    });
    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});

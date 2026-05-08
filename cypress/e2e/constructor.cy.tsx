const testUrl = 'http://localhost:4000';

const bunName = 'Краторная булка N-200i';
const ingredientName = 'Биокотлета из марсианской Магнолии';

const constructorSelector = '[data-cy=constructor]';
const modalSelector = '[data-cy=modal]';
const closeModalSelector = '[data-cy=close-modal]';
const overlaySelector = '[data-cy=overlay]';

describe('constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    });

    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    });

    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    });

    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.setCookie('accessToken', 'test-access-token');

    cy.visit(testUrl);

    cy.reload(true);
  });

  it('should open ingredient modal', () => {
    cy.contains(bunName).click();

    cy.get(modalSelector).should('exist');

    cy.get(modalSelector).should('contain', bunName);
  });

  it('should close ingredient modal', () => {
    cy.contains(bunName).click();

    cy.get(modalSelector).should('exist');

    cy.get(closeModalSelector).click();

    cy.get(modalSelector).should('not.exist');
  });

  it('should close modal by overlay click', () => {
    cy.contains(bunName).click();

    cy.get(modalSelector).should('exist');

    cy.get(overlaySelector).click({ force: true });

    cy.get(modalSelector).should('not.exist');
  });

  it('should add bun to constructor', () => {
    cy.contains(bunName).parent().contains('Добавить').click();

    cy.get(constructorSelector).should('contain', bunName);
  });

  it('should add ingredient to constructor', () => {
    cy.contains(ingredientName).parent().contains('Добавить').click();

    cy.get(constructorSelector).should('contain', ingredientName);
  });

  it('should create order', () => {
    cy.contains(bunName).parent().contains('Добавить').click();

    cy.contains(ingredientName).parent().contains('Добавить').click();

    cy.contains('Оформить заказ').click();

    cy.contains('12345').should('exist');

    cy.get(closeModalSelector).click();

    cy.get(modalSelector).should('not.exist');

    cy.get(constructorSelector).should('contain', 'Выберите булки');

    cy.get(constructorSelector).should('contain', 'Выберите начинку');
  });
});

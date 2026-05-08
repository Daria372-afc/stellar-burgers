describe('constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    });

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    });

    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    });

    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.setCookie('accessToken', 'test-access-token');

    cy.visit('http://localhost:4000');

    cy.reload(true);
  });

  it('should open ingredient modal', () => {
    cy.contains('Краторная булка N-200i').click();

    cy.get('[data-cy=modal]').should('exist');
  });

  it('should close ingredient modal', () => {
    cy.contains('Краторная булка N-200i').click();

    cy.get('[data-cy=modal]').should('exist');

    cy.get('[data-cy=close-modal]').click();

    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('should close modal by overlay click', () => {
    cy.contains('Краторная булка N-200i').click();

    cy.get('[data-cy=modal]').should('exist');

    cy.get('[data-cy=overlay]').click({ force: true });

    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('should add bun to constructor', () => {
    cy.contains('Краторная булка N-200i').parent().contains('Добавить').click();

    cy.get('[data-cy=constructor]').should('contain', 'Краторная булка N-200i');
  });

  it('should add ingredient to constructor', () => {
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .contains('Добавить')
      .click();

    cy.get('[data-cy=constructor]').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('should create order', () => {
    cy.contains('Краторная булка N-200i').parent().contains('Добавить').click();

    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .contains('Добавить')
      .click();

    cy.contains('Оформить заказ').click();

    cy.contains('12345').should('exist');

    cy.get('[data-cy=close-modal]').click();

    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=constructor]').should('contain', 'Выберите булки');

    cy.get('[data-cy=constructor]').should('contain', 'Выберите начинку');
  });
});

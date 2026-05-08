/// <reference types="jest" />

import store from './store';

describe('rootReducer', () => {
  it('should initialize correctly', () => {
    const state = store.getState();

    expect(state).toEqual({
      ingredients: {
        items: [],
        isLoading: false,
        error: null
      },

      user: {
        user: null,
        isAuth: false,
        isLoading: false,
        isAuthChecked: false
      },

      order: {
        orderData: null,
        isLoading: false
      },

      burgerConstructor: {
        bun: null,
        ingredients: []
      },

      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      }
    });
  });
});

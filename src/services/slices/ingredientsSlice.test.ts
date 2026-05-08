/// <reference types="jest" />

import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const mockIngredients = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 100,
      image: '',
      image_mobile: '',
      image_large: ''
    }
  ];

  it('should handle pending', () => {
    const state = ingredientsReducer(
      {
        items: [],
        isLoading: false,
        error: null
      },
      fetchIngredients.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
  });

  it('should handle fulfilled', () => {
    const state = ingredientsReducer(
      {
        items: [],
        isLoading: true,
        error: null
      },
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
  });

  it('should handle rejected', () => {
    const state = ingredientsReducer(
      {
        items: [],
        isLoading: true,
        error: null
      },
      fetchIngredients.rejected(new Error('Ошибка'), '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});

/// <reference types="jest" />

import ingredientsReducer, {
  fetchIngredients,
  initialState
} from './ingredientsSlice';

const mockIngredient = {
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
};

const mockIngredients = [mockIngredient];

describe('ingredientsSlice', () => {
  it('should handle pending', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
  });

  it('should handle fulfilled', () => {
    const state = ingredientsReducer(
      {
        ...initialState,
        isLoading: true
      },
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
  });

  it('should handle rejected', () => {
    const state = ingredientsReducer(
      {
        ...initialState,
        isLoading: true
      },
      fetchIngredients.rejected(new Error('Ошибка'), '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});

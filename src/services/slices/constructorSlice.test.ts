/// <reference types="jest" />

import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';

describe('constructorSlice', () => {
  const bun = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 100,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const ingredient = {
    _id: '2',
    name: 'Котлета',
    type: 'main',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 50,
    image: '',
    image_mobile: '',
    image_large: '',
    id: 'test-id'
  };

  it('should add bun', () => {
    const state = constructorReducer(
      {
        bun: null,
        ingredients: []
      },
      addIngredient({
        ...bun,
        id: 'bun-id'
      })
    );

    expect(state.bun?.name).toBe('Булка');
  });

  it('should add ingredient', () => {
    const state = constructorReducer(
      {
        bun: null,
        ingredients: []
      },
      addIngredient(ingredient)
    );

    expect(state.ingredients.length).toBe(1);
  });

  it('should remove ingredient', () => {
    const state = constructorReducer(
      {
        bun: null,
        ingredients: [ingredient]
      },
      removeIngredient('test-id')
    );

    expect(state.ingredients.length).toBe(0);
  });

  it('should clear constructor', () => {
    const state = constructorReducer(
      {
        bun,
        ingredients: [ingredient]
      },
      clearConstructor()
    );

    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  it('should move ingredient', () => {
    const ingredient2 = {
      ...ingredient,
      id: 'test-id-2',
      name: 'Соус'
    };

    const state = constructorReducer(
      {
        bun: null,
        ingredients: [ingredient, ingredient2]
      },
      moveIngredient({
        fromIndex: 0,
        toIndex: 1
      })
    );

    expect(state.ingredients[0].id).toBe('test-id-2');
    expect(state.ingredients[1].id).toBe('test-id');
  });
});

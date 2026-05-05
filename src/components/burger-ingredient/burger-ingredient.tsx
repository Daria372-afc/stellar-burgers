import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import { addIngredient } from '../../services/slices/constructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    console.log('CLICK FROM PAGE:', location.pathname);
    const dispatch = useDispatch();

    const handleAdd = () => {
      const data = {
        ...ingredient,
        id: Date.now().toString()
      };

      console.log('DISPATCH DATA:', data);
      console.log('TYPE OF DATA:', typeof data);

      dispatch(addIngredient(data));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);

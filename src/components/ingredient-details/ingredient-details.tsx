import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams();

  const { items: ingredients, isLoading } = useSelector(
    (state) => state.ingredients
  );

  console.log('--- IngredientDetails ---');
  console.log('ID:', id);
  console.log('INGREDIENTS LENGTH:', ingredients.length);
  console.log('IS LOADING:', isLoading);

  if (isLoading || !ingredients.length) {
    return <Preloader />;
  }

  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <div>Ингредиент не найден</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 120
      }}
    >
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};

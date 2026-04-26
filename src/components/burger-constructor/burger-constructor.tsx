import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { createOrder } from '../../services/slices/orderSlice';
import { clearOrder } from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const burgerConstructor = useSelector((state) => state.burgerConstructor);

  console.log('STORE CONSTRUCTOR:', burgerConstructor);
  console.log('TYPE:', typeof burgerConstructor); /**/

  const constructorItems = {
    bun: burgerConstructor?.bun ?? null,
    ingredients: burgerConstructor?.ingredients ?? []
  };

  const { orderData, isLoading } = useSelector((state) => state.order);

  const orderRequest = isLoading;
  const orderModalData = orderData;

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuth) {
      navigate('/login');
      return;
    }

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      ),
      constructorItems.bun._id
    ];

    const res = await dispatch(createOrder(ingredientsIds));

    if (createOrder.fulfilled.match(res)) {
      dispatch(clearConstructor());
    }
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      ((constructorItems.ingredients ?? []) as TConstructorIngredient[]).reduce(
        (s, v) => s + v.price,
        0
      ),
    [constructorItems]
  );

  try {
    return (
      <BurgerConstructorUI
        price={price}
        orderRequest={orderRequest}
        constructorItems={constructorItems}
        orderModalData={orderModalData}
        onOrderClick={onOrderClick}
        closeOrderModal={closeOrderModal}
      />
    );
  } catch (e) {
    console.error('BURGER CONSTRUCTOR CRASH:', e);
    return <div>Ошибка в BurgerConstructor</div>;
  }
};

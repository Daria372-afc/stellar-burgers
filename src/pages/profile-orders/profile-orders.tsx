import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.feed.orders) || [];

  useEffect(() => {
    const token = localStorage.getItem('accessToken')?.split('Bearer ')[1];

    dispatch({
      type: 'ws/connect',
      payload: `wss://norma.education-services.ru/orders?token=${token}`
    });

    return () => {
      dispatch({ type: 'ws/disconnect' });
    };
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};

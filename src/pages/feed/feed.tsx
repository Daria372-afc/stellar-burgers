import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.feed.orders) || [];
  const total = useSelector((state) => state.feed.total);
  const totalToday = useSelector((state) => state.feed.totalToday);

  useEffect(() => {
    dispatch({
      type: 'ws/connect',
      payload: 'wss://norma.education-services.ru/orders/all'
    });

    return () => {
      dispatch({ type: 'ws/disconnect' });
    };
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} total={total} totalToday={totalToday} />;
};

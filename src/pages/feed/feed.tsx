import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  const { orders, isLoading } = useSelector((state) => state.feed);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchFeed());
    }
  }, [dispatch, orders.length]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        console.log('CLICK');
        dispatch(fetchFeed());
      }}
    />
  );
};

import { Middleware } from '@reduxjs/toolkit';
import { setOrders } from '../slices/feedSlice';

export const socketMiddleware: Middleware = (store) => {
  let socket: WebSocket | null = null;

  return (next) => (action: any) => {
    if (action.type === 'ws/connect') {
      console.log('WS CONNECT:', action.payload);

      socket = new WebSocket(action.payload);

      socket.onopen = () => {
        console.log('WS OPEN');
      };

      socket.onmessage = (event) => {
        console.log('WS MESSAGE:', event.data);

        const data = JSON.parse(event.data);
        store.dispatch(
          setOrders({
            orders: data.orders,
            total: data.total,
            totalToday: data.totalToday
          })
        );
      };

      socket.onerror = (e) => {
        console.log('WS ERROR:', e);
      };

      socket.onclose = () => {
        console.log('WS CLOSED');
      };
    }

    if (action.type === 'ws/disconnect') {
      socket?.close();
      socket = null;
    }

    return next(action);
  };
};

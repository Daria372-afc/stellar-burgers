import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth
}) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  // если страница только для НЕавторизованных
  if (onlyUnAuth && isAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  // если нужна авторизация
  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

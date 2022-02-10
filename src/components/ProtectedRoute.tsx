import React, { PropsWithChildren, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../index';

type ProtectedRouteProps = PropsWithChildren<{}>;

export const ProtectedRoute = ({
  children,
}: ProtectedRouteProps): ReactElement => {
  const loggedIn = useSelector(
    (state: RootState) => state.authentication.loggedIn,
  );

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

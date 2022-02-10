import { Middleware, Dispatch, AnyAction } from '@reduxjs/toolkit';
import exceptionLogger from './exceptions';
import reduxLogger from './redux-logger';
import { History } from 'history';
import contextMiddleware from './context';

export function createMiddleware(
  history: History,
  appMiddleware: Middleware[],
): Middleware<{}, any, Dispatch<AnyAction>>[] {
  const middleware = [];

  middleware.push(exceptionLogger);
  middleware.push(contextMiddleware);

  if (process.env.NODE_ENV === 'development' && reduxLogger) {
    middleware.push(reduxLogger);
  }

  for (const mid of appMiddleware) {
    middleware.push(mid);
  }

  return middleware;
}

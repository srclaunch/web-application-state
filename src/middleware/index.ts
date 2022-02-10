import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import { History } from 'history';

import contextMiddleware from './context';
import exceptionLogger from './exceptions';
import reduxLogger from './redux-logger';

export function createMiddleware(
  history: History,
  appMiddleware: readonly Middleware[],
): readonly Middleware<{}, any, Dispatch<AnyAction>>[] {
  const middleware = [];

  middleware.push(exceptionLogger, contextMiddleware);

  if (process.env.NODE_ENV === 'development' && reduxLogger) {
    middleware.push(reduxLogger);
  }

  for (const mid of appMiddleware) {
    middleware.push(mid);
  }

  return middleware;
}

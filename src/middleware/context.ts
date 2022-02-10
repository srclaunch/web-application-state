import { RootState } from '..';
import { Middleware } from 'redux';

const contextMiddleware: Middleware<
  {}, // Most middleware do not modify the dispatch return value
  RootState
> = store => next => action => {
  return next(action);
};

export default contextMiddleware;

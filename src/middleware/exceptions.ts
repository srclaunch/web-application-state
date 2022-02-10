import { UncaughtException } from '@srclaunch/exceptions';
import Logger from '@srclaunch/logger';
import { Middleware } from 'redux';

import { RootState } from '../index';

const logger = new Logger();

const exceptionLogger: Middleware<
  {}, // Most middleware do not modify the dispatch return value
  RootState
> = store => next => action => {
  try {
    return next(action);
  } catch (err: any) {
    const exception = new UncaughtException(err.name, { cause: err });

    logger.exception(exception.toJSON());

    // Raven.captureException(err, {
    //   extra: {
    //     action,
    //     state: store.getState()
    //   }
    // });
    throw err;
  }
};

export default exceptionLogger;

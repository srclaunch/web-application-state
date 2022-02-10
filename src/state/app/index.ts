import { combineReducers } from '@reduxjs/toolkit';

import config from './config';
import navigation from './navigation';
import routes from './routes';

export default combineReducers({
  config,
  navigation,
  routes,
});

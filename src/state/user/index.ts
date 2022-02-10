import { combineReducers } from '@reduxjs/toolkit';

import authentication from './authentication';
import details from './details';

export default combineReducers({
  authentication,
  details,
});

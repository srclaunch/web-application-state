import { combineReducers } from '@reduxjs/toolkit';
import modals from './modals';
import notifications from './notifications';
import themes from './themes';

export default combineReducers({
  modals,
  notifications,
  themes,
});

import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISO8601String } from '@srclaunch/types';
import { DateTime } from 'luxon';
import login from './login';
import signup from './signup';
import usernameAvailability from './username-availability';
import verification from './verification';

type AuthenticationState = {
  initialized: boolean;
  lastUpdated?: ISO8601String;
  loggedIn: boolean;
  tokens?: {
    accessToken: string;
  };
};

const initialState: AuthenticationState = {
  initialized: false,
  lastUpdated: undefined,
  loggedIn: false,
};

const slice = createSlice({
  initialState,
  name: 'authentication',
  reducers: {
    setLoggedIn: (
      state,
      action: PayloadAction<{
        accessToken: string;
      }>,
    ) => {
      state.lastUpdated = DateTime.now().toISO();
      state.tokens = action.payload;
      state.loggedIn = true;
    },
    setLoggedOut: state => {
      state.lastUpdated = DateTime.now().toISO();
      state.tokens = undefined;
      state.loggedIn = false;
    },
  },
});

export const { setLoggedIn, setLoggedOut } = slice.actions;

export default combineReducers({
  state: slice.reducer,
  login,
  signup,
  usernameAvailability,
  verification,
});

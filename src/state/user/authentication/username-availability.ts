import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthenticationService } from '@srclaunch/services';
import { DateTime } from 'luxon';
import {
  AuthenticationUsernameAvailabilityCheckException,
  Exception,
} from '@srclaunch/exceptions';
import { ISO8601String } from '@srclaunch/types';

import { AppThunk } from '../../../index';

type UsernameAvailabilityState = {
  available?: boolean;
  error?: Exception | Error;
  lastUpdated?: ISO8601String;
  inProgress: boolean;
  success?: boolean;
};

const initialState: UsernameAvailabilityState = {
  inProgress: false,
};

const slice = createSlice({
  initialState,
  name: 'usernameAvailability',
  reducers: {
    setCheckUsernameAvailabilityFailure: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = action.payload;
    },
    setCheckUsernameAvailabilityInProgress: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.inProgress = action.payload;
    },
    setCheckUsernameAvailabilitySuccess: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.lastUpdated = DateTime.now().toISO();
      state.available = action.payload;
    },
  },
});

export default slice.reducer;

const {
  setCheckUsernameAvailabilityFailure,
  setCheckUsernameAvailabilityInProgress,
  setCheckUsernameAvailabilitySuccess,
} = slice.actions;

export const checkUsernameAvailability =
  ({ username }: { username: string }): AppThunk =>
  async dispatch => {
    try {
      dispatch(setCheckUsernameAvailabilityInProgress(true));

      const available = await AuthenticationService.checkUsernameAvailability({
        username,
      });

      dispatch(setCheckUsernameAvailabilitySuccess(available));
      dispatch(setCheckUsernameAvailabilityInProgress(false));
    } catch (err:any) {
      const exception =
        err instanceof Exception
          ? err
          : new AuthenticationUsernameAvailabilityCheckException(
              'An exception occurred while checking username availability',
              {
                cause: err,
                origin: {
                  file: 'src/state/user/authentication/username-availability.ts',
                },
              },
            );

      dispatch(setCheckUsernameAvailabilityFailure(exception.toJSON()));
    }
  };

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AuthenticationUsernameAvailabilityCheckException,
  Exception,
} from '@srclaunch/exceptions';
import { ISO8601String } from '@srclaunch/types';
// import { AuthenticationService } from '@srclaunch/http-services';
import { DateTime } from 'luxon';

import { AppThunk } from '../../../index';

type UsernameAvailabilityState = {
  readonly available?: boolean;
  readonly error?: Exception | Error;
  readonly lastUpdated?: ISO8601String;
  readonly inProgress: boolean;
  readonly success?: boolean;
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
  ({ username }: { readonly username: string }): AppThunk =>
  async dispatch => {
    try {
      dispatch(setCheckUsernameAvailabilityInProgress(true));

      // const available = await AuthenticationService.checkUsernameAvailability({
      //   username,
      // });

      // dispatch(setCheckUsernameAvailabilitySuccess(available));
      dispatch(setCheckUsernameAvailabilityInProgress(false));
    } catch (error: any) {
      const exception =
        error instanceof Exception
          ? error
          : new AuthenticationUsernameAvailabilityCheckException(
              'An exception occurred while checking username availability',
              {
                cause: error,
                origin: {
                  file: 'src/state/user/authentication/username-availability.ts',
                },
              },
            );

      dispatch(setCheckUsernameAvailabilityFailure(exception.toJSON()));
    }
  };

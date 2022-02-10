import { createSlice } from '@reduxjs/toolkit';
import { Exception } from '@srclaunch/exceptions';
import { CommunicationMedium, ISO8601String } from '@srclaunch/types';
// import { AuthenticationService } from '@srclaunch/http-services';
import { DateTime } from 'luxon';

import { AppThunk } from '../../../../../index';

type VerificationStatusState = {
  readonly delivery?: {
    readonly destination: string;
    readonly medium:
      | CommunicationMedium.Email
      | CommunicationMedium.PhoneNumber;
  };
  readonly error?: Exception | Error;
  readonly inProgress: boolean;
  readonly lastUpdated?: ISO8601String;
  readonly status?: string;
  readonly success?: boolean;
};

const initialState: VerificationStatusState = {
  delivery: undefined,
  error: undefined,
  inProgress: false,
  lastUpdated: undefined,
  status: undefined,
  success: undefined,
};

const slice = createSlice({
  initialState,
  name: 'status',
  reducers: {
    setVerificationStatusLookupFailure: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.success = false;
      state.inProgress = false;
      state.error = action.payload;
    },
    setVerificationStatusLookupInProgress: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = undefined;
      state.success = undefined;
      state.inProgress = action.payload;
    },
    setVerificationStatusLookupSuccess: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = undefined;
      state.status = action.payload.status;
      state.delivery = action.payload.delivery;
      state.inProgress = false;
      state.success = true;
    },
  },
});

export default slice.reducer;

const {
  setVerificationStatusLookupFailure,
  setVerificationStatusLookupInProgress,
  setVerificationStatusLookupSuccess,
} = slice.actions;

export const getVerificationDetails =
  ({ userId }: { readonly userId: string }): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setVerificationStatusLookupInProgress(true));

      // const details = await AuthenticationService.getVerificationDetails(
      //   userId,
      // );

      // if ('error' in details) {
      //   const exception = new Exception(
      //     'Failure retrieving user verification status.',
      //     {},
      //   );

      //   dispatch(setVerificationStatusLookupFailure(exception.toJSON()));

      //   return;
      // }

      // dispatch(setVerificationStatusLookupSuccess(details));

      dispatch(setVerificationStatusLookupInProgress(false));
    } catch (error: any) {
      const exception =
        error instanceof Exception
          ? error
          : new Exception(error.message, {
              cause: error,
            });

      dispatch(setVerificationStatusLookupFailure(exception.toJSON()));
      dispatch(setVerificationStatusLookupInProgress(false));
    }
  };

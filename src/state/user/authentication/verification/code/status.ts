import { Exception } from '@srclaunch/exceptions';
import { CommunicationMedium, ISO8601String } from '@srclaunch/types';
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../../../../../index';
import { AuthenticationService } from '@srclaunch/services';
import { DateTime } from 'luxon';

type VerificationStatusState = {
  delivery?: {
    destination: string;
    medium: CommunicationMedium.Email | CommunicationMedium.PhoneNumber;
  };
  error?: Exception | Error;
  inProgress: boolean;
  lastUpdated?: ISO8601String;
  status?: string;
  success?: boolean;
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
  ({ userId }: { userId: string }): AppThunk =>
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

    } catch (err: any) {
      const exception =
        err instanceof Exception
          ? err
          : new Exception(err.message, {
              cause: err,
            });

      dispatch(setVerificationStatusLookupFailure(exception.toJSON()))
      dispatch(setVerificationStatusLookupInProgress(false));

    }
  };

import { Exception } from '@srclaunch/exceptions';
import { ISO8601String } from '@srclaunch/types';
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../../../../../index';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { DateTime } from 'luxon';

type VerificationCodeResendState = {
  error?: Exception | Error;
  lastUpdated?: ISO8601String;
  inProgress: boolean;
  success?: boolean;
};

const initialState: VerificationCodeResendState = {
  error: undefined,
  inProgress: false,
  lastUpdated: undefined,
  success: undefined,
};

const slice = createSlice({
  initialState,
  name: 'resend',
  reducers: {
    setVerificationCodeResendFailure: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.inProgress = false;
      state.success = false;
      state.error = action.payload;
    },
    setVerificationCodeResendInProgress: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = undefined;
      state.success = undefined;
      state.inProgress = action.payload;
    },
    setVerificationCodeResendSuccess: state => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = undefined;
      state.inProgress = false;
      state.success = true;
    },
  },
});

export default slice.reducer;

const {
  setVerificationCodeResendFailure,
  setVerificationCodeResendInProgress,
  setVerificationCodeResendSuccess,
} = slice.actions;

export const resendVerificationCode =
  ({ userId }: { userId: string }): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setVerificationCodeResendInProgress(true));

      const config = getState().app.config;
      const poolData = {
        ClientId: config.aws.cognito.userPoolClientId,
        UserPoolId: config.aws.cognito.userPoolId,
      };
      const userPool = new CognitoUserPool(poolData);
      const userData = {
        Pool: userPool,
        Username: userId,
      };
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          const exception = new Exception(
            'Failure resending verification code',
            {
              cause: err,
            },
          );

          dispatch(setVerificationCodeResendFailure(exception.toJSON()));

          return;
        }

        console.log('resendConfirmationCode result', result);

        dispatch(setVerificationCodeResendSuccess());
      });
    } catch (err: any) {
      const exception = new Exception('Failure resending verification code', {
        cause: err,
      });

      dispatch(setVerificationCodeResendFailure(exception.toJSON()));
    }
  };

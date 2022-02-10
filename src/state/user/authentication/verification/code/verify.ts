import { createSlice } from '@reduxjs/toolkit';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { DateTime } from 'luxon';
import { Exception } from '@srclaunch/exceptions';
import { ISO8601String } from '@srclaunch/types';
import { AppThunk } from '../../../../../index';

type VerificationCodeVerifyState = {
  error?: Exception | Error;
  lastUpdated?: ISO8601String;
  inProgress: boolean;
  success?: boolean;
};

const initialState: VerificationCodeVerifyState = {
  error: undefined,
  inProgress: false,
  lastUpdated: undefined,
  success: undefined,
};

const slice = createSlice({
  initialState,
  name: 'verify',
  reducers: {
    setVerificationCodeVerifyFailure: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = action.payload;
      state.inProgress = false;
    },
    setVerificationCodeVerifyInProgress: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.inProgress = action.payload;
    },
    setVerificationCodeVerifySuccess: state => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = undefined;
      state.success = true;
      state.inProgress = false;
    },
  },
});

export default slice.reducer;

const {
  setVerificationCodeVerifyFailure,
  setVerificationCodeVerifyInProgress,
  setVerificationCodeVerifySuccess,
} = slice.actions;

export const verifyCode =
  ({ code, userId }: { code: string; userId: string }): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setVerificationCodeVerifyInProgress(true));

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

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        const exception = new Exception(
          'Failure confirming verification code',
          {
            cause: err,
          },
        );

        dispatch(setVerificationCodeVerifyFailure(exception.toJSON()));

        return;
      }

      dispatch(setVerificationCodeVerifySuccess());
    });
  };

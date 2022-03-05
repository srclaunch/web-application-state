import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AuthenticationException,
  Exception,
  // Exception,
  InvalidArgumentException,
  MissingArgumentException,
} from '@srclaunch/exceptions';
import {
  Condition,
  FormValidationProblem,
  ISO8601String,
} from '@srclaunch/types';
// import { AuthenticationService } from '@srclaunch/http-services';
import { validate } from '@srclaunch/validation';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
// import AWS from 'aws-sdk';
// import { Credentials } from 'aws-sdk/lib/credentials';
import { DateTime } from 'luxon';

// import { Navigate } from 'react-router-dom';
import { AppThunk } from '../../../index';

type SignupState = {
  readonly error?: Exception | Error;
  readonly lastUpdated?: ISO8601String;
  readonly inProgress: boolean;
  readonly success?: boolean;
  readonly userId?: string;
};

const initialState: SignupState = {
  inProgress: false,
};

const slice = createSlice({
  initialState,
  name: 'signup',
  reducers: {
    setSignupFailure: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = action.payload;
      state.inProgress = false;
    },
    setSignupInProgress: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.inProgress = action.payload;
    },
    setSignupSuccess: (
      state,
      action: PayloadAction<{ readonly userId: string }>,
    ) => {
      state.lastUpdated = DateTime.now().toISO();
      state.inProgress = false;
      state.userId = action.payload.userId;
      state.success = true;
    },
  },
});

export default slice.reducer;

const { setSignupFailure, setSignupInProgress, setSignupSuccess } =
  slice.actions;

export const signUp =
  ({
    firstName,
    lastName,
    password,
    username,
  }: {
    readonly firstName: string;
    readonly lastName: string;
    readonly password: string;
    readonly username: string;
  }): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setSignupInProgress(true));

      // const config = getState().app.config;

      if (!username) {
        const err = new MissingArgumentException(
          `"username" property is required.`,
          {
            form: {
              field: 'username',
              problem: FormValidationProblem.Required,
            },
          },
        );

        dispatch(setSignupFailure(err.toJSON()));

        return;
      }

      if (!password) {
        const err = new MissingArgumentException(
          `"password" property is required.`,
          {
            form: {
              field: 'password',
              problem: FormValidationProblem.Required,
            },
          },
        );

        dispatch(setSignupFailure(err.toJSON()));

        return;
      }

      const problems = validate(username, {
        [Condition.IsEmailAddress]: true,
      });

      if (problems.length > 0) {
        const err = new InvalidArgumentException(
          `"username" value is not valid email.`,
          {
            form: {
              field: 'username',
              problem: FormValidationProblem.NotValidEmail,
            },
          },
        );

        dispatch(setSignupFailure(err.toJSON()));

        return;
      }
      // analytics.sendEvent('User Login - Error');

      const config = getState().app.config;

      // AWS.config.update({
      //   region: config.aws.region,
      // });

      const poolData = {
        ClientId: config.aws.cognito.userPoolClientId,
        UserPoolId: config.aws.cognito.userPoolId,
      };

      const userPool = new CognitoUserPool(poolData);

      const attributeList = [
        new CognitoUserAttribute({
          Name: 'email',
          Value: username,
        }),
        new CognitoUserAttribute({
          Name: 'given_name',
          Value: firstName,
        }),
        new CognitoUserAttribute({
          Name: 'family_name',
          Value: lastName,
        }),
      ];

      userPool.signUp(username, password, attributeList, [], (err, result) => {
        if (err) {
          console.log('err', err);
          const exception = new Exception('Failure when signing user up', {
            cause: err,
          });

          dispatch(setSignupFailure(exception.toJSON()));

          return;
        }

        if (!result) {
          const exception = new Exception('Unknown error occurred', {});

          dispatch(setSignupFailure(exception.toJSON()));

          return;
        }

        const cognitoUser = result?.user;
        const userSub = result.userSub;

        if (userSub) {
          dispatch(setSignupInProgress(false));
          dispatch(setSignupSuccess({ userId: userSub }));
        }
      });

      // });
    } catch (error: any) {
      if (error.name === AuthenticationException.name) {
        dispatch(setSignupFailure(error.toJSON()));

        return;
      }

      throw error;
    }
  };

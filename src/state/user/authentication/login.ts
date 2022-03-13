import { createSlice } from '@reduxjs/toolkit';
import {
  AuthenticationLoginException,
  Exception,
  InvalidArgumentException,
  MissingArgumentException,
} from '@srclaunch/exceptions';
import { Logger } from '@srclaunch/logger';
import {
  Condition,
  FormValidationProblem,
  ISO8601String,
} from '@srclaunch/types';
import { validate } from '@srclaunch/validation';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import { Credentials } from 'aws-sdk/lib/credentials';
import { DateTime } from 'luxon';

import { AppThunk } from '../../../index';
import { setUserAttributes } from '../details';
import { setLoggedIn, setLoggedOut } from './index';

const logger = new Logger();

type LoginState = {
  readonly error?: Exception | Error;
  readonly lastUpdated?: ISO8601String;
  readonly inProgress: boolean;
  readonly success?: boolean;
};

const initialState: LoginState = {
  inProgress: false,
};

const slice = createSlice({
  initialState,
  name: 'login',
  reducers: {
    setLoginFailure: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.success = false;
      state.error = action.payload;
      state.inProgress = false;
    },
    setLoginInProgress: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = undefined;
      state.success = undefined;
      state.inProgress = action.payload;
    },
    setLoginSuccess: state => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = undefined;
      state.success = true;
      state.inProgress = false;
    },
  },
});

export default slice.reducer;

const { setLoginFailure, setLoginInProgress, setLoginSuccess } = slice.actions;

export const login =
  ({
    username,
    password,
  }: {
    readonly username: string;
    readonly password: string;
  }): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoginInProgress(true));

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

        dispatch(setLoginFailure(err.toJSON()));

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

        dispatch(setLoginFailure(err.toJSON()));

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

        dispatch(setLoginFailure(err.toJSON()));

        return;
      }

      const config = getState().app.config;

      AWS.config.update({
        region: config.aws.region,
      });

      const authenticationData = {
        Password: password,
        Username: username,
      };

      const authenticationDetails = new AuthenticationDetails(
        authenticationData,
      );
      const poolData = {
        ClientId: config.aws.cognito.userPoolClientId,
        UserPoolId: config.aws.cognito.userPoolId,
      };
      const userPool = new CognitoUserPool(poolData);
      const userData = {
        Pool: userPool,
        Username: username,
      };
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onFailure: err => {
          const exception = new Exception(
            'Error encountered while logging user in',
            {
              cause: err,
            },
          );

          dispatch(setLoginFailure(exception.toJSON()));
        },
        onSuccess: result => {
          const accessToken = result.getAccessToken().getJwtToken();

          const credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config.aws.cognito.identityPoolId,
            Logins: {
              // Change the key below according to the specific region your user pool is in.
              [`cognito-idp.${config.aws.region}.amazonaws.com/${config.aws.cognito.userPoolId}`]:
                result.getIdToken().getJwtToken(),
            },
          });

          AWS.config.credentials = credentials as Credentials;

          // @ts-ignore
          AWS.config.credentials.refresh(err => {
            if (err) {
              const exception = new Exception(
                'Error encountered while refreshing credentials',
                {
                  cause: err,
                },
              );

              dispatch(setLoginFailure(exception.toJSON()));
            } else {
              cognitoUser.getUserAttributes((err2, attributes) => {
                if (err2) {
                  const exception = new Exception(
                    'Error encountered while getting user attributes',
                    {
                      cause: err2,
                    },
                  );

                  logger.exception(exception.toJSON());

                  dispatch(setLoginFailure(exception.toJSON()));
                } else if (attributes) {
                  let attrs = {};

                  for (const attr of Object.entries(attributes)) {
                    attrs = {
                      [attr[1].Name]: attr[1].Value,
                      ...attrs,
                    };
                  }

                  dispatch(setUserAttributes(attrs));
                  dispatch(
                    setLoggedIn({
                      accessToken,
                    }),
                  );
                  dispatch(setLoginSuccess());
                }
              });
            }
          });
        },
      });
    } catch (error: any) {
      const exception =
        error instanceof Exception
          ? error
          : new AuthenticationLoginException(
              'An unknown error occurred while logging a user in.',
              {
                cause: error,
              },
            );

      dispatch(setLoginFailure(exception.toJSON()));
    }
  };

export const refreshSession = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setLoginInProgress(true));

    const config = getState().app.config;

    AWS.config.update({
      region: config.aws.region,
    });

    const poolData = {
      ClientId: config.aws.cognito.userPoolClientId,
      UserPoolId: config.aws.cognito.userPoolId,
    };

    console.log('poolData', poolData);
    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    console.log('cognitoUser', cognitoUser);

    if (cognitoUser === null) {
      dispatch(setLoggedOut());
      dispatch(setLoginInProgress(false));
    } else {
      cognitoUser.getSession(
        (err: Error, session: CognitoUserSession | null) => {
          if (err) {
            dispatch(setLoggedOut());
            dispatch(setLoginInProgress(false));

            return;
          }

          console.log('session', session);

          if (!session) {
            dispatch(setLoggedOut());
            dispatch(setLoginInProgress(false));

            return;
          }

          if (!session.isValid()) {
            dispatch(setLoggedOut());
            dispatch(setLoginInProgress(false));
          } else {
            const accessToken = session.getIdToken().getJwtToken();

            AWS.config.update({
              region: config.aws.region,
            });

            const credentials: Credentials = new AWS.CognitoIdentityCredentials(
              {
                IdentityPoolId: config.aws.cognito.identityPoolId,
                Logins: {
                  // Change the key below according to the specific region your user pool is in.
                  [`cognito-idp.${config.aws.region}.amazonaws.com/${config.aws.cognito.userPoolId}`]:
                    session.getIdToken().getJwtToken(),
                },
              },
            );

            AWS.config.credentials = credentials as Credentials;
            // @ts-ignore
            AWS.config.credentials.refresh(err => {
              if (err) {
                const exception = new Exception(
                  'Error encountered while refreshing credentials',
                  {
                    cause: err,
                  },
                );

                logger.exception(exception.toJSON());

                dispatch(setLoggedOut());
                dispatch(setLoginInProgress(false));
              } else {
                cognitoUser.getUserAttributes((err2, attributes) => {
                  if (err2) {
                    const exception = new Exception(
                      'Error encountered getting user attributes',
                      {
                        cause: err,
                      },
                    );

                    logger.exception(exception.toJSON());

                    dispatch(setLoggedOut());
                    dispatch(setLoginInProgress(false));
                  } else if (!attributes) {
                    dispatch(setLoggedOut());
                    dispatch(setLoginInProgress(false));
                  } else {
                    let attrs = {};

                    for (const attr of Object.entries(attributes)) {
                      attrs = {
                        ...attrs,
                        [attr[1].Name]: attr[1].Value,
                      };
                    }

                    dispatch(setUserAttributes(attrs));
                    dispatch(
                      setLoggedIn({
                        accessToken,
                      }),
                    );
                    dispatch(setLoginSuccess());
                  }
                });
              }
            });
          }
        },
      );
    }
  } catch (error: any) {
    const exception = new Exception(
      'Error encountered getting user attributes',
      {
        cause: error,
      },
    );

    logger.exception(exception.toJSON());

    dispatch(setLoginFailure(exception.toJSON()));
  }
};

export const logout = (): AppThunk => async (dispatch, getState) => {
  const config = getState().app.config;
  const poolData = {
    ClientId: config.aws.cognito.userPoolClientId,
    UserPoolId: config.aws.cognito.userPoolId,
  };
  const userPool = new CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser();

  if (cognitoUser) {
    cognitoUser.signOut(() => {
      dispatch(setLoggedOut());
    });
  }
};

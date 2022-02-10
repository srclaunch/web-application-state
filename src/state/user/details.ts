import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exception } from '@srclaunch/exceptions';
import { User, UserPreferences } from '@srclaunch/types';
import { DateTime } from 'luxon';

// import { UserService } from '@srclaunch/http-services';
import { AppThunk } from '../../index';

type UserDetailsState = Partial<User> & {
  readonly attributes?: Record<string, string>;
  readonly error?: Exception | Error;
  readonly inProgress: boolean;
  readonly lastUpdated?: DateTime;
};

const initialState: UserDetailsState = {
  inProgress: false,
};

const slice = createSlice({
  initialState,
  name: 'details',
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setInProgress: (state, action) => {
      state.inProgress = action.payload;
    },
    setUserAttributes: (
      state,
      action: PayloadAction<Record<string, string>>,
    ) => {
      state.attributes = action.payload;
    },
    setUserDetails: (state, action) => {
      const { analytics, info, communication, preferences } = action.payload;

      state.communication = communication;
      state.info = info;
      state.analytics = analytics;
      state.preferences = preferences;
    },
    setUserPreferences: (
      state,
      action: { readonly payload: UserPreferences },
    ) => {
      state.preferences = action.payload;
    },
  },
});
//
// export const getUserDetails = (): AppThunk => async (dispatch, getState) => {
//   const user = await UserService.getUserDetails();
//
//   if (user) {
//     dispatch(slice.actions.setUserDetails(user));
//
//     // analytics.identifyUser(user.id, {
//     //   email_address: user.email_address,
//     //   first_name: user.first_name,
//     //   last_name: user.last_name,
//     //   login_count: user.login_count,
//     // });
//
//     await Promise.all([
//       dispatch(getSubscriptions()),
//       dispatch(slice.actions.setInitialized()),
//     ]);
//   }
// };

export const { setUserAttributes } = slice.actions;
export default slice.reducer;

export const getUserDetails = (): AppThunk => async (dispatch, getState) => {
  // const user = await UserService.getUserDetails();
  // if (user) {
  // dispatch(slice.actions.setUserDetails(user));
  // analytics.identifyUser(user.id, {
  //   email_address: user.email_address,
  //   first_name: user.first_name,
  //   last_name: user.last_name,
  //   login_count: user.login_count,
  // });
  // await Promise.all([
  //   dispatch(getSubscriptions()),
  //   dispatch(slice.actions.setInitialized()),
  // ]);
  // }
};

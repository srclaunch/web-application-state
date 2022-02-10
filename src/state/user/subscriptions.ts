import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
// import { SubscriptionService } from '@srclaunch/http-services';
import { Subscription } from '@srclaunch/types';
import { DateTime } from 'luxon';

import { AppDispatch, AppThunk, RootState } from '../../index';

const subscriptionsAdapter = createEntityAdapter<Subscription>({
  selectId: subscription => subscription.id,
});

export const selectors = subscriptionsAdapter.getSelectors(
  (state: RootState) => state.getState().subscriptions,
);

type SubscriptionsState = {
  readonly error?: Error | string;
  readonly in_progress: boolean;
  readonly initialized: boolean;
  readonly last_updated?: DateTime;
};

const subscriptionsSlice = createSlice({
  initialState: subscriptionsAdapter.getInitialState<SubscriptionsState>({
    in_progress: false,
    initialized: false,
  }),
  name: 'subscriptions',
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setInProgress: (state, action: { readonly payload: boolean }) => {
      state.in_progress = action.payload;
    },
    setSubscriptions: (
      state,
      action: { readonly payload: readonly Subscription[] },
    ) => subscriptionsAdapter.setAll(state, action.payload),
  },
});

export const getSubscriptions =
  (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(subscriptionsSlice.actions.setInProgress(true));

    // const subscriptions = await SubscriptionService.list();

    // @ts-ignore
    // dispatch(subscriptionsSlice.actions.setSubscriptions(subscriptions));

    dispatch(subscriptionsSlice.actions.setInProgress(true));
  };

export default subscriptionsSlice.reducer;

import { PaymentMethod } from '@srclaunch/types';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

import { AppDispatch, AppThunk, RootState } from '../../index';
import { PaymentMethodService } from '@srclaunch/services';

const paymentMethodsAdapter = createEntityAdapter<PaymentMethod>({
  selectId: paymentMethod => paymentMethod.id,
});
export const selectors = paymentMethodsAdapter.getSelectors(
  (state: RootState) => state.getState().paymentMethods,
);

type PaymentMethodsState = {
  error?: Error | string;
  in_progress: boolean;
  initialized: boolean;
  last_updated?: DateTime;
};

const slice = createSlice({
  initialState: paymentMethodsAdapter.getInitialState<PaymentMethodsState>({
    in_progress: false,
    initialized: false,
  }),
  name: 'payment_methods',
  reducers: {
    deletePaymentMethod: (state, action) =>
      paymentMethodsAdapter.removeOne(state, action.payload),
    setError: (state, action) => {
      state.error = action.payload;
    },
    setInProgress: (state, action: { payload: boolean }) => {
      state.in_progress = action.payload;
    },
    setPaymentMethods: (state, action: { payload: PaymentMethod[] }) => {
      paymentMethodsAdapter.addMany(state, action.payload);
    },
  },
});

export const getPaymentMethods =
  (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(slice.actions.setInProgress(true));

    const paymentMethods = await PaymentMethodService.list();

    dispatch(
      slice.actions.setPaymentMethods(paymentMethods as PaymentMethod[]),
    );

    dispatch(slice.actions.setInProgress(true));
  };

export const deletePaymentMethod =
  (id: PaymentMethod['id']): AppThunk =>
  async (dispatch: AppDispatch) => {
    // const paymentMethodSelectors = paymentMethodsAdapter.getSelectors<RootState>((state) => state.paymentMethods);
    // const paymentMethod = paymentMethodSelectors.selectById(getState(), id.toString());

    dispatch(slice.actions.setInProgress(true));
    dispatch(slice.actions.deletePaymentMethod(id));

    await PaymentMethodService.delete(id);

    dispatch(slice.actions.setInProgress(false));
  };

export default slice.reducer;
